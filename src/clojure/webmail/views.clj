(ns webmail.views
  (:use compojure.core
  	ring.util.response)
  (:require 
		(clojure.java [jdbc :refer :all])
		(neveragain [common :refer :all])
		(neveragain [settings :as settings])
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
