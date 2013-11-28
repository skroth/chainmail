(ns neveragain.common
	(:require 
		(clojure [string :as string])
		(clojure.java [jdbc :refer :all])
		(neveragain [settings :as settings]))
	(:import 
		(neveragain CustomPublicKey)
		(java.net ServerSocket InetAddress Socket)
		(org.bouncycastle.jce.provider BouncyCastleProvider JCEElGamalPublicKey)
		(org.bouncycastle.jce.spec ElGamalParameterSpec ElGamalPublicKeySpec)
		(org.bouncycastle.util.encoders Hex)
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
	(.println out-writer (str message "\r"))
	(.flush out-writer))

(defn get-hostname []
	(.getHostName (InetAddress/getLocalHost)))

(defn get-user-record
	([address]
		(get-user-record address settings/db))
	([address db]
		(with-connection db
			(with-query-results rs 
				(into [] (concat ["SELECT * FROM users WHERE address=? AND hostname=?"] 
					(string/split address #"@")))
				(first rs)))))

(defn has-account-here 
	([address]
		(has-account-here address settings/db))
	([address db]
		(with-connection db
			(with-query-results rs 
				(into [] (concat ["SELECT 1 FROM users WHERE address=? AND hostname=?"] 
					(string/split address #"@")))
				(boolean rs)))))

(defn hash-pass [password]
	(BCrypt/hashpw password (BCrypt/gensalt settings/salt-factor)))

(defn match-pass 
	([address password]
		(match-pass address password settings/db))
	([address password db]
		(with-connection db
			(with-query-results user-data
					(into [] (concat ["SELECT hashword FROM users WHERE address=? AND hostname=?"] 
						(string/split address #"@")))
				(BCrypt/checkpw password (:hashword (first user-data)))))))

(defn gen-aes-key
	([]
		(gen-aes-key settings/default-aes-key-size))
	([key-size]
		(let [kg (KeyGenerator/getInstance "AES" "BC")]
			(.init kg key-size)
			(.generateKey kg))))

(defn gen-key-pair 
	([]
		(gen-key-pair settings/default-ecc-key-size))
	([key-length] 
		"Generate a random ElGamal key pair."
		(let [kpg (KeyPairGenerator/getInstance  "ElGamal" "BC")]
			(.initialize kpg key-length (SecureRandom.))
			(.generateKeyPair kpg))))

(defn serialize-pub-key [key]
	(let [spec (.getParams key)]
		(string/join "/" [(.getY key) (.getP spec) (.getG spec)])))

(defn deserialize-pub-key [key]
	"Takes an ascii/utf-8 string in the format 'y/p/g' (where each letter
	encodes a big integer) and creates an ElGamalPublicKeySpec."
	(let [[y p g] (map (fn [x] (BigInteger. x)) (string/split key #"/"))]
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

(defn encrypt-message [message pub-key]
	"Encrypt a message and return the cipher text and an encrypted AES key (the 
	message is encrypted with the AES key, the AES key is encrypted with the 
	public key)"
	(let [aes-key (gen-aes-key)
			aes-cipher (Cipher/getInstance "AES/CTR/NoPadding" "BC")
			elgamal-cipher (Cipher/getInstance "ElGamal/None/NoPadding" "BC")]
		(.init aes-cipher Cipher/ENCRYPT_MODE aes-key)
		(.init elgamal-cipher Cipher/ENCRYPT_MODE pub-key)
		(let [cipher-text (block-proc aes-cipher (.getBytes message "UTF-8"))
				cipher-key (block-proc elgamal-cipher (.getEncoded aes-key))
				; store the IV in the first 16 bytes of our ciphertext
				aug-cipher-text (byte-array (concat (seq (.getIV aes-cipher)) (seq cipher-text)))]
			[aug-cipher-text cipher-key])))

(defn decrypt-message [cipher-text enc-aes-key priv-key]
	"Decrypt a message and return it as an array of bytes."
	(let [elgamal-cipher (Cipher/getInstance "ElGamal/None/NoPadding" "BC")]
		(.init elgamal-cipher Cipher/DECRYPT_MODE priv-key)
		(let [aes-key-material (block-proc elgamal-cipher enc-aes-key)
				aes-key (SecretKeySpec. aes-key-material "AES")
				aes-cipher (Cipher/getInstance "AES/CTR/NoPadding" "BC")
				cipher-seq (seq cipher-text)
				iv (IvParameterSpec. (byte-array (take 16 cipher-seq)))
				actual-cipher-text (byte-array (drop 16 cipher-seq))]
			(.init aes-cipher Cipher/DECRYPT_MODE aes-key iv)
			(block-proc aes-cipher actual-cipher-text))))

(defn save-raw-message 
	([message recipient]
		"Call save-raw-message with the default database"
		(save-raw-message message recipient settings/db))
	([message recipient db]
		"Encrypt a message and save it to the database, placing it in the inbox of
		the local user with the specified full email address."
		(with-connection db
			(with-query-results user-data 
				(into [] (concat ["SELECT * FROM users WHERE address=? AND hostname=?"] 
					(string/split recipient #"@")))
				(let [user (first user-data)
						pub-key (deserialize-pub-key (:elgamal_pub_key user))
						[cipher-text enc-key] (encrypt-message message pub-key)]
					(insert-records "messages" {
						:recipient_id (:id user)
						:data cipher-text
						:aes_key enc-key
						:recv_date (quot (System/currentTimeMillis) 1000) }))))))

(defn get-mx-hosts [hostname]
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
	; Assemble a conn object with wrapped :in and :out streams
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

(defn relay-message [envl recipient]
	(let [hostname (get (string/split recipient #"@") 1)
			mx-hosts (get-mx-hosts hostname)]
		(loop [[[priority host] & remaining] mx-hosts]
			(println (str "Trying host " host))
			(let [conn (negotiate-socket host false)]
				(if-not conn
					(if (seq remaining) (recur remaining) nil)
					(do
						(write-out (:out conn) (str "EHLO " (get-hostname)))
				    (println (.readLine (:in conn)))))))))

(defn proc-envelope [envl]
	(dorun (for [recipient (:recipients envl)]
		(if (has-account-here recipient)
			(save-raw-message (:data envl) recipient)
			(relay-message envl recipient)))))
