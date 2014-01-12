(ns webmail.views
  (:use compojure.core
    ring.util.response)
  (:require 
    (neveragain [common :refer :all])
    (neveragain [settings :as settings])
    (clojure.java [jdbc :refer :all])
    (clojure.data [json :as json])
    (clojure.data.codec [base64 :as b64])
    [clojure.string :as string]
    [compojure.handler :as handler]
    [compojure.response :as response])
  (:import
    (org.mindrot.jbcrypt BCrypt)))

(defn make-redirect 
  ([destination]
    (make-redirect destination "303 Redirected"))
  ([destination message]
    {:status 303 
     :body message
     :headers {"Location" destination} }))

(defn login [request]
  (if-not (has-account-here (get (:params request) "address"))
    "No such account here"
    (let [user (get-user-record (get (:params request) "address"))
        password (get (:params request) "password")]
      (if-not (BCrypt/checkpw password (:hashword user))
        "Bad password"
        {:status 303
         :body "Login successful."
         :headers {"Location" "/inbox"}
         :session (assoc (:session request) :user user)}))))

(defn make-key
  ([request]
    (make-key request settings/db))
  ([request db]
    "Generate a new elGamal key pair, store the public material in the database 
    and send the private key to the user."
    (let [key-pair (gen-key-pair)
        pub-key (.getPublic key-pair)
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
           :x (.getX priv-key)})))))

(defn send-mail [request]
  (let [user (:user (:session request))
      envl {
        :from (str (:address user) "@" (:hostname user))
        :to (string/split (:recipients (:params request)) #",")
        :data (:data (:params request))}]
    (relay-message envl)
    {:status 200
     :body (json/write-str {:status "success"})}))

(defn index [request]
  (if (:user (:session request)) 
    (make-redirect "/inbox")
    (make-redirect "/login")))

(defn list-messages 
  ([request]
    (list-messages request settings/db))
  ([request db]
    (with-connection db
      (with-query-results rs ["SELECT * FROM messages WHERE recipient_id=? ORDER BY recv_date" 
          (:id (:user (:session request)))] 
        (json/write-str rs)))))
