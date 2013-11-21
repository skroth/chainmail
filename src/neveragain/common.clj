(ns neveragain.common
	(:require 
		(clojure [string :as string])
		(clojure.java [jdbc :refer :all])
		(neveragain [settings :as settings]))
	(:import 
		(java.net ServerSocket InetAddress Socket)
		(java.io PrintWriter InputStreamReader BufferedReader)
		(java.util Hashtable)
		(javax.naming.directory InitialDirContext)
		(org.mindrot.jbcrypt BCrypt)))

(defn write-out [out-writer message]
	(.println out-writer (str message "\r"))
	(.flush out-writer))

(defn get-hostname []
	(.getHostName (InetAddress/getLocalHost)))

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
					(recur (conj hosts (.next attr)))
					hosts)))))

(defn relay-message [envl recipient]
	(let [hostname (get (string/split recipient #"@") 1)
			ip-address (InetAddress/getByName hostname)
			socket (Socket. ip-address 25)
      in (BufferedReader. (InputStreamReader. (.getInputStream socket)))
      out (PrintWriter. (.getOutputStream socket))
      conn {:in in :out out :socket socket}]
	  (println "sup broskiez")
    (println ip-address)
    (write-out (:out conn) (str "EHLO " (get-hostname)))
    (println (.readLine (:in conn)))

	))

(defn proc-envelope [envl]
	(dorun (for [recipient (:recipients envl)]
		(if (has-account-here recipient)
			(save-raw-message (:data envl) recipient)
			(relay-message envl recipient)))))
