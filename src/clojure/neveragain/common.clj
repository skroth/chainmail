(ns neveragain.common
  (:require
    (clojure [string :as string])
    (clojure.java [jdbc :refer :all])
    (clojure.data [json :as json])
    [clojure.data.codec.base64 :as b64]
    (neveragain [settings :as settings]
                [addresses :as addresses]))
  (:import
    (neveragain CustomPublicKey)
    (java.net ServerSocket InetAddress Socket)
    (org.bouncycastle.jce.provider BouncyCastleProvider)
    (org.bouncycastle.jce.spec ElGamalParameterSpec ElGamalPublicKeySpec)
    (org.bouncycastle.crypto.modes CCMBlockCipher)
    (org.bouncycastle.crypto.engines AESFastEngine)
    (org.bouncycastle.crypto.params KeyParameter CCMParameters)
    (java.lang.String)
    (java.util Date)
    (java.security KeyPairGenerator SecureRandom Security)
    (java.io PrintWriter InputStreamReader BufferedReader IOException)
    (java.util Hashtable Scanner NoSuchElementException)
    (javax.crypto Cipher KeyGenerator)
    (javax.crypto.spec SecretKeySpec IvParameterSpec)
    (javax.naming.directory InitialDirContext)
    (javax.net.ssl SSLSocketFactory)
    (org.mindrot.jbcrypt BCrypt)))

;; Mmhmm, I love me some good ole state
(Security/addProvider (new BouncyCastleProvider))

(defn write-out [out-writer message]
  "Write a line to the socket (or any print writer) and flush."
  (println "S: " message)
  (.println out-writer (str message "\r"))
  (.flush out-writer))

(defn strftime 
  "Formats a string per the C strftime function."
  [fmt t]
  (let [fmt (.replaceAll fmt "%([a-zA-Z])" "%1\\$t$1")]
    (format fmt t)))

(defn get-hostname []
  (.getHostName (InetAddress/getLocalHost)))

(defn b64s->utf8s 
  "Takes a base64 encoded string and returns it decoded into a utf-8 string."
  [s]
  (String. (b64/decode (.getBytes s "UTF-8")) "UTF-8"))

(defn bytes->b64s
  "Takes a byte or character array and returns a base64 encoded string."
  [byte-arr]
  (String. (b64/encode byte-arr) "UTF-8"))

(defn strip-quotes
  "Returns input unless the first and last characters are double quotes, in
  which case the input without quotes is returned"
  [s]
  (if (and (= (first s) \")
           (= (last s) \"))
    (.substring s 1 (dec (count s)))
    s))

(defn get-user-record
  "Takes a string representing a single address and returns the full record of
  the user holding that mailbox."
  ([address]
    (get-user-record address settings/db))
  ([address db]
   (let [parsed (addresses/parse-address address)]
     (first
      (query db ["SELECT * FROM users WHERE address=? AND hostname=? LIMIT 1;"
                 (:norm-box-name parsed)
                 (:domain parsed)])))))

(defn has-account-here
  ([address]
    (has-account-here address settings/db))
  ([address db]
   (let [parsed (addresses/parse-address address)]
     (boolean
      (first
       (query db ["SELECT 1 FROM users WHERE address=? AND hostname=?"
                  (:norm-box-name parsed)
                  (:domain parsed)]))))))

(defn hash-pass [password]
  (BCrypt/hashpw password (BCrypt/gensalt settings/salt-factor)))

(defn match-pass
  ([address password]
    (match-pass address password settings/db))
  ([address password db]
    "Returns true if the supplied password matches the stored hashed password
    for the user with address `address`."
    (let [user-data (first (query db (into [] (concat
        ["SELECT hashword FROM users WHERE address=? AND hostname=?"]
        (string/split address #"@")))))]
      (BCrypt/checkpw password (:hashword user-data)))))

(defn gen-aes-key
  ([]
    (gen-aes-key settings/default-aes-key-size))
  ([key-size]
    "Generate a random AES key with a given key length."
    (let [kg (KeyGenerator/getInstance "AES" "BC")]
      (.init kg key-size)
      (KeyParameter. (.getEncoded (.generateKey kg))))))

(defn gen-key-pair
  ([]
    (gen-key-pair settings/default-ecc-key-size))
  ([key-length]
    "Generate a random ElGamal key pair with a given key length."
    (let [kpg (KeyPairGenerator/getInstance  "ElGamal" "BC")]
      (.initialize kpg key-length (SecureRandom.))
      (.generateKeyPair kpg))))

(defn serialize-key-pair [key-pair]
  "Encodes a ElGamal key pair in JSON with BigIntegers being stored in base64."
  (let [pub-key (.getPublic key-pair)
        priv-key (.getPrivate key-pair)]
    (json/write-str
     (reduce
      ; b64 encode the 4 BigIntegers that make up the keypair
      (fn [m [key val]]
        (assoc m key (apply str (map char (b64/encode (.toByteArray val))))))
        {}
        {:p (.getP (.getParams pub-key))
         :g (.getG (.getParams pub-key))
         :y (.getY pub-key)
         :x (.getX priv-key)}))))

(defn serialize-pub-key [key]
  "Encodes a ElGamal public key in JSON with BigIntegers being stored in base64."
  (let [spec (.getParams key)
        raw-key {:y (.getY key)
                 :p (.getP spec)
                 :g (.getG spec)}]
    (json/write-str
     (reduce
      (fn [m [k v]]
        (assoc m k
               (apply str (map char (b64/encode (.toByteArray v))))))
      {}
      raw-key))))

(defn deserialize-pub-key [key]
  "Inverse of serialize-pub-key."
  (let [reconstitute (fn [k v] (BigInteger. (b64/decode (.getBytes v "UTF-8"))))
        {:strs [y p g]} (json/read-str key :value-fn reconstitute)]
    (CustomPublicKey. (ElGamalPublicKeySpec. y (ElGamalParameterSpec. p g)))))

(defn block-proc [cipher message]
  "Sequentially processes blocks of an arbitrary sized sequence using an
  initialized cipher. Seq must be castable to a byte array."
  (let [block-size (.getBlockSize cipher)]
    (loop [next-block (take block-size message)
        cipher-text []
        remaining (drop block-size message)]
      (if (= (count next-block) block-size)
        (recur
          (take block-size remaining)
          (concat cipher-text (seq (.update cipher (byte-array next-block))))
          (drop block-size remaining))
        (byte-array (concat cipher-text
          (.doFinal cipher (byte-array next-block))))))))

(defn bc-block-proc [cipher message]
  "Same as `block-proc` but for the Bouncy Castle engine API"
  (let [in-len (alength message)
      out-len (.getOutputSize cipher in-len)
      out (byte-array out-len)
      written (.processBytes cipher message 0 in-len out 0)]
    (.doFinal cipher out written)
    out))

(defn random-bytes [num-bytes]
  "Generate a secure array of random bytes, used for making IVs."
  (let [rbytes (byte-array num-bytes)]
    (.nextBytes (SecureRandom.) rbytes)
    rbytes))

(defn eg-encrypt 
  "ElGamal encrypts an array of bytes using pub-key and returns the encrypted
  byte array."
  [message pub-key]
  (let [elgamal-cipher (Cipher/getInstance "ElGamal/None/NoPadding" "BC")]
    (.init elgamal-cipher Cipher/ENCRYPT_MODE pub-key)
    (block-proc elgamal-cipher message)))

(defn eg-decrypt 
  "ElGamal decrypts an array of bytes using priv-key and returns the decrypted
  byte array."
  [message priv-key]
  (let [elgamal-cipher (Cipher/getInstance "ElGamal/None/NoPadding" "BC")]
    (.init elgamal-cipher Cipher/DECRYPT_MODE priv-key)
    (block-proc elgamal-cipher message)))

(defn encrypt-message [message pub-key]
  "Encrypt a message and return the cipher text and an encrypted AES key (the
  message is encrypted with the AES key, the AES key is encrypted with the
  public key) and the initialization vector used with the AES key."
  (let [aes-key (gen-aes-key)
      aes-cipher (CCMBlockCipher. (AESFastEngine.))
      elgamal-cipher (Cipher/getInstance "ElGamal/None/NoPadding" "BC")
      iv (random-bytes 13) ; Random 13 byte IV/nonce
      ccm-params (CCMParameters.
        aes-key
        64 ; 64 bit tag size, we'll stick with it across the system
        iv
        (.getBytes ""))] ; 0 bytes of associated data

    (.init aes-cipher true ccm-params)
    (.init elgamal-cipher Cipher/ENCRYPT_MODE pub-key)
    [
      (bc-block-proc aes-cipher (.getBytes message "UTF-8")) ; Cipher text
      (block-proc elgamal-cipher (.getKey aes-key)) ; Cipher key
      iv ; Initialization vector
    ]))

(defn decrypt-message [cipher-text enc-aes-key priv-key]
  "Decrypt a message and return it as an array of bytes."
  (let [elgamal-cipher (Cipher/getInstance "ElGamal/None/NoPadding" "BC")]
    (.init elgamal-cipher Cipher/DECRYPT_MODE priv-key)
    (let [aes-key-material (block-proc elgamal-cipher enc-aes-key)
        aes-key (KeyParameter. aes-key-material)
        aes-cipher (CCMBlockCipher. (AESFastEngine.))
        cipher-seq (seq cipher-text)
        iv (byte-array (take 15 cipher-seq))
        tag (byte-array (take-last 8 cipher-seq))
        actual-cipher-text (byte-array (drop 15 cipher-seq))
        ccm-params (CCMParameters.
          aes-key
          64 ; 64 bit tag size, we'll stick with it across the system
          iv ; Random 15 byte IV
          (.getBytes ""))]
      (.init aes-cipher false ccm-params)
      (bc-block-proc aes-cipher actual-cipher-text))))

(defn save-raw-message
  ([message recipient]
    "Call save-raw-message with the default database"
    (save-raw-message message recipient settings/db))
  ([message recipient db]
    "Encrypt a message and save it to the database, placing it in the inbox of
    the local user with the specified full email address. Returns the id of the
    newly saved message."
    (let [user (first (query db (into [] (concat
          ["SELECT * FROM users WHERE address=? AND hostname=? LIMIT 1"]
          (string/split recipient #"@")))))
        pub-key (deserialize-pub-key (:elgamal_pub_key user))
        [cipher-text enc-key iv] (encrypt-message message pub-key)]
      ; sqlite's last row id key name doesn't play nice with clojure's syntax
      ; but this'll work
      (let [message-id ((keyword "last_insert_rowid()") (first
            (insert! db :messages {
              :recipient_id (:id user)
              :data (apply str (map char (b64/encode cipher-text)))
              :pub_key (:elgamal_pub_key user)
              :aes_key (apply str (map char (b64/encode enc-key)))
              :iv (apply str (map char (b64/encode iv)))
              :recv_date (quot (System/currentTimeMillis) 1000) })))]

        ; Now insert the inbox tag record
        (insert! db :tags {
          :owner_id (:id user)
          :name "inbox"
          :message_id message-id })

        ; And return the message id, like we said
        message-id))))

(defn get-mx-hosts [hostname]
  "Returns a vector containing [priority host] pairs of MX records for a
  given FQDN"
  (let [env (Hashtable.)]
    (.put env "java.naming.factory.initial" "com.sun.jndi.dns.DnsContextFactory")
    (let [idcx (InitialDirContext. env)
        attrs (.getAttributes idcx hostname (into-array ["MX"]))
        attr (.getAll (.get attrs "MX"))]

      ; Now we have a bastardized enumerable, let's make it something less ungodly
      (loop [hosts []]
        (if (.hasMore attr)
          (recur (conj hosts ; append [priority host] to the hosts vector
            (string/split
              ; Pop off the trailing period
              (string/join "" (butlast (.next attr))) #"\s")))
          ; Sort the list by ascending "distance"
          (sort-by (fn [x] (Integer. (first x))) hosts))))))

(defn make-conn [s]
  "Takes a socket and returns a map of wrapped input and output streams along
  with the original socket. This configuration is generally used to represent
  a foreign connection within this project."
  (let [conn {
      :in (Scanner. (.getInputStream s))
      :out (PrintWriter. (.getOutputStream s))
      :socket s}]
    (.useDelimiter (:in conn) #"\r\n")
    conn))

(defn negotiate-socket [hostname mandatory-tls]
  ; Try a few socket configurations and return a socket-like object if any
  ; of them are viable. If mandatory-tls is true won't return a non-ssl socket.
  (try
    (let [ip-address (InetAddress/getByName hostname)
        socket (Socket. ip-address 25)]
      (make-conn socket))
    (catch IOException e nil)))

(defn read-smtp-block [conn]
  "Reads from the connection into a buffer until a terminal line is hit."
  (loop [line (.next (:in conn)) data ""]
    (if (re-matches #"^\d{3}-.*" line)
      (recur (.next (:in conn)) (str data "\r\n" line))
      (str data "\r\n" line))))

(defn safe-chop [s len]
  (let [i (min len (count s))]
    [(subs s 0 i) (subs s i)]))

(defn next-line [s len]
  (let [[t-line remaining] (safe-chop s len)
        ss (String. t-line)
        chop-i (max (.lastIndexOf ss " ")
                    (.lastIndexOf ss "\r\n"))]
    (cond 
      (neg? chop-i)
        [(str t-line "\r\n ") remaining]
      (= chop-i (.lastIndexOf ss "\r\n"))
        ; If we're chopping at a newline this is a semantic split, so we dont
        ; make the linebreak folded.
        (let [[l ls] (safe-chop s (inc chop-i))] [(str l "\r\n") ls])
      :else
        (let [[l ls] (safe-chop s (inc chop-i))] [(str l "\r\n ") ls]))))

(defn break-lines [s line-length]
  (loop [lines []
         [line s-left] (next-line s line-length)]
    (if (seq s-left)
      (recur (conj lines line) (next-line s-left line-length))
      (string/join "" (conj lines line)))))

(defn prep-2822-message [headers body]
  "Prepare a message for transmission per the RFC 2822 spec. Takes a string to
  string map for headers and a simple string for body. Will handle line breaking
  and escaping."
  (string/join "\r\n" (conj
    (vec (for [[k v] headers]
      (str
        ;;(string/replace (name k) #":" "(colon)")
        (name k)
        ": "
        (string/replace v #":" "(colon)"))))
    "" ; Create a double new line between headers and content
    (string/replace (break-lines body 78)
                    "\r\n.\r\n"
                    "\r\n .\r\n"))))

(defn daemon-wrap 
  "Takes a message in a form as in the database, renders it in the ChainMail
  transit format, and wraps it as an IMF message from the mailer daemon."
  [message new-to-address]
  (let [tutivillus (str "tutivillus@" (get-hostname))
        headers {:Content-Transfer-Encoding "7bit"
                 :Content-Type "text/plain; charset=utf-8"
                 :Date (strftime "%a, %d %b %Y %H:%M:%S %Z" (Date.))
                 :From (str "Chainmail Mailer Daemon <" tutivillus ">")
                 :MIME-Version "1.0"
                 :Subject "Forwarded Ciphertext Contained Within"
                 :To (str "You <" new-to-address ">")
                 :User-Agent "Chainmail/Daemon"}
        body (str "Below is an encrypted message. No further information is "
                  "available until the message has been decrypted. To do so "
                  "you'll need to install a chainmail integration plugin "
                  "available at <OUR ADDRESS> and have your private key on "
                  "hand.\r\n"
                  "=== BEGIN CHAINMAIL DATA ===\r\n"
                  (json/write-str
                   {:protocol_version "0.1"
                    :data (:data message)
                    :aes_key (:aes_key message)
                    :iv (:iv message)
                    :recv_date (:recv_date message)}))]
    (prep-2822-message headers body)))



(defn rewrite-for-forwarding [envl user forwarding-address]
  "Encrypts a plaintext envelope and wraps it in a secondary envelope to be
  transmitted to a third party email provider. Returns modified envelope."
  (let [pub-key (deserialize-pub-key (:elgamal_pub_key user))
        [cipher-text enc-key iv] (encrypt-message (:data envl) pub-key)
        message {:data (apply str (map char (b64/encode cipher-text)))
                 :aes_key (apply str (map char (b64/encode enc-key)))
                 :iv (apply str (map char (b64/encode iv)))
                 :recv_date (quot (System/currentTimeMillis) 1000) }]
    {:from (str "tutivillus@" (get-hostname))
     :to [forwarding-address]
     :data (daemon-wrap message forwarding-address)}))

(defn relay-message [envl recipient]
  "Accepts an envelope and a single recipient, then acts as a SMTP client,
  transmitting the envelope, unmodified, to the host suggested by the
  recipient's address."
  (let [recipient-addr (addresses/parse-address recipient)
        hostname (:domain recipient-addr)
        mx-hosts (get-mx-hosts hostname)]
    (loop [[[priority host] & remaining] mx-hosts]
      (println (str "Trying host " host))
      (let [conn (negotiate-socket host false)]
        (println (str "R: " (.next (:in conn))))
        (if-not conn
          (if (seq remaining) (recur remaining) nil)
          (do
            (write-out (:out conn) (str "EHLO " (get-hostname)))
            (println (str "S: " "EHLO " (get-hostname)))
            ; Read the EHLO response, don't do anything with it for the moment.
            (println (read-smtp-block conn))
            (write-out (:out conn) (str "MAIL FROM:<" (:from envl) ">"))
            (println (read-smtp-block conn))
            (write-out (:out conn) (str "RCPT TO:<" recipient ">"))
            (println (read-smtp-block conn))
            (write-out (:out conn) "DATA")
            (println (read-smtp-block conn))
            (write-out (:out conn) (:data envl))
            (write-out (:out conn) ".")
            (println (read-smtp-block conn))
            (write-out (:out conn) "EXIT")
            ))))))

(defn proc-envelope
  ([envl]
    (proc-envelope envl settings/db))
  ([envl db]
    (dorun (for [recipient (:recipients envl)]
      (let [user (get-user-record recipient)]
        (if-not user
          (relay-message envl recipient)
          (let [directives (query db [
              "SELECT * FROM forwarding_directives WHERE owner_id=?"
              (:id user)])]
            ; Save the message to the database no matter what
            (save-raw-message (:data envl) recipient)

            ; and forward it if there were any directives
            (dorun (for [{f-address :destination_address} directives]
              (relay-message (rewrite-for-forwarding envl user f-address)
                             f-address))))))))))

