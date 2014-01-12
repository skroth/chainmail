(ns neveragain.auth
  (:require 
    (clojure [string :as string])
    [clojure.data.codec.base64 :as b64]
    [neveragain.common :refer :all]))

(defn string-b64-decode [input-string]
  (try 
    (apply str (map char (b64/decode (.getBytes input-string))))
    (catch Exception e nil)))

(def auth-methods {
  "LOGIN" (fn [msg conn envl]
    (write-out (:out conn) "334 username:")
    (let [address (string-b64-decode (.next (:in conn)))]
      (cond
        (= address nil) (do
          (write-out (:out conn) "500 malformed username, please transmit in b64")
          envl)
        (not (has-account-here address)) (do
          (write-out (:out conn) "500 no such user")
          envl)
        :else (do
          (write-out (:out conn) "334 password:")
          (let [password (string-b64-decode (.next (:in conn)))]
            (cond
              (= password nil) (do
                (write-out (:out conn) "500 malformed password, please transmit in b64")
                envl)
              (not (match-pass address password)) (do
                (write-out (:out conn) "500 password did not match username")
                envl)
              :else (do
                (write-out (:out conn) "200 authenticated OK")
                (assoc envl :authenticated true))))))))
})

(defn no-such-method [msg conn envl]
  (write-out (:out conn) "500 invalid authentication method")
  envl)

(defn auth-handler [msg conn envl]
  (let [method (get (string/split msg #"\s" 2) 1)]
    ((get auth-methods method no-such-method) msg conn envl)))

(def extension-description {
  :name (str "AUTH " (string/join " " (keys auth-methods)))
  :advertise true
  :install-handlers (fn [v-map]
    (assoc v-map "AUTH" auth-handler))
  })
