(ns neveragain.common
	(:require 
		(clojure [string :as string])
		(clojure.java [jdbc :refer :all])
		(neveragain [settings :as settings]))
	(:import 
		(java.net ServerSocket InetAddress)
		(org.mindrot.jbcrypt BCrypt)))

(defn write-out [out-writer message]
	(.println out-writer message)
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

(defn proc-envelope [envl]
	(dorun (for [recipient (:recipients envl)]
		(save-raw-message (:data envl) recipient))))
