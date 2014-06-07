(ns neveragain.auth
  (:require 
    (clojure [string :as string])
    (clojure.data.codec [base64 :as b64])
    (korma [core :as k])
    (neveragain [common :refer :all]
                [entities :as e])))

(defn string-b64-decode [input-string]
  (try 
    (apply str (map char (b64/decode (.getBytes input-string))))
    (catch Exception e nil)))

(defn wrap-auth-rate-limiter
  "Takes an SMTP authentication verb function and returns that function wrapped
  in the standard authentication rate limiting logic."
  [f]
  (fn [msg conn envl]
    (let [addr (.getInetAddress (:socket conn))]
      (if-not (can-authenticate? addr)
        (do
          (write-out (:out conn)
                     (format 
                       (str "500 Hark knave! Desist in thine ceaseless "
                            "queries, thou shalt be ignored until thine "
                            "designated hour of: %s")
                       (i-can-haz-auth-time!?! addr)))
          envl)
        (let [new-envl (f msg conn envl)]
          (if (:authenticated new-envl)
            (passed-auth! addr)
            (failed-auth! addr))
          new-envl)))))

(defn login 
  "Implements SMTP's `AUTH LOGIN` verb."
  [msg conn envl]
  (write-out (:out conn) "334 username:")
  (let [address (string-b64-decode (.next (:in conn)))]
    (println address)
    (cond
      (= address nil) 
        (do
          (write-out (:out conn) (str "500 malformed username, please "
                                      "transmit in b64"))
          envl)
      (not (has-account-here address))
        (do
          (write-out (:out conn) "500 no such user")
          envl)
      :else 
        (do
          (write-out (:out conn) "334 password:")
          (let [password (string-b64-decode (.next (:in conn)))]
            (cond
              (= password nil) 
                (do
                  (write-out (:out conn) (str "500 malformed password, please "
                                              "transmit in b64"))
                envl)
              (not (match-pass address password))
                (do
                  (write-out (:out conn) "500 password did not match username")
                  envl)
              :else
                (do
                  (write-out (:out conn) "200 authenticated OK")
                  (assoc envl :authenticated true))))))))

(def auth-methods 
  {"LOGIN" (wrap-auth-rate-limiter login)})

(defn no-such-method [msg conn envl]
  (write-out (:out conn) "500 invalid authentication method")
  envl)

(defn auth-handler [msg conn envl]
  (let [method (get (string/split msg #"\s" 2) 1)]
    ((get auth-methods method no-such-method) msg conn envl)))

(def extension-description 
  {:name (str "AUTH " (string/join " " (keys auth-methods)))
   :advertise true
   :watched-files ["src/clojure/neveragain/auth.clj"]
   :install-handlers (fn [v-map]
                       (assoc v-map "AUTH" auth-handler))})
