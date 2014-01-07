(ns webmail.views
  (:use compojure.core
  	ring.util.response)
  (:require 
		(neveragain [common :refer :all])
		(neveragain [settings :as settings])
		(clojure.java [jdbc :refer :all])
		(clojure.data [json :as json])
    [compojure.handler :as handler]
    [compojure.response :as response])
  (:import
		(org.mindrot.jbcrypt BCrypt)))

(defn login [params session]
	(if-not (has-account-here (get params "address"))
		"No such account here"
		(let [user (get-user-record (get params "address"))
				password (get params "password")]
			(if-not (BCrypt/checkpw password (:hashword user))
				"Bad password"
				(-> (response "You logged in. Much good. Gold star!")
					(assoc :session (assoc session :user user)))))))

(defn list-messages 
	([session]
		(list-messages session settings/db))
	([session db]
		(with-connection db
			(with-query-results rs ["SELECT * FROM messages WHERE recipient_id=? ORDER BY recv_date" 
					(:id (:user session))] 
				(println rs)
				(json/write-str rs)))))
