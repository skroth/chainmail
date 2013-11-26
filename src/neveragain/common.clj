(ns neveragain.common
	(:require 
		(clojure [string :as string])
		(clojure.java [jdbc :refer :all])
		(neveragain [settings :as settings]))
	(:import 
		(java.net ServerSocket InetAddress Socket)
		(java.io PrintWriter InputStreamReader BufferedReader IOException)
		(java.util Hashtable Scanner NoSuchElementException)
		(javax.naming.directory InitialDirContext)
		(javax.net.ssl SSLSocketFactory)
		(org.mindrot.jbcrypt BCrypt)))

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

(defn save-raw-message 
	([message recipient]
		(save-raw-message message recipient settings/db))

	([message recipient db]
		(with-connection db
			(with-query-results user-data 
				(into [] (concat ["SELECT * FROM users WHERE address=? AND hostname=?"] 
					(string/split recipient #"@")))
				(insert-records "messages" {
					:recipient_id (:id user-data)
					:data message
					:recv_date (quot (System/currentTimeMillis) 1000) })))))

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
