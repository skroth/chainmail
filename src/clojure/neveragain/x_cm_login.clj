(ns neveragain.x-cm-login
  (:require
    (clojure [string :as string])
    (neveragain
      [common :as common]
      [settings :as settings])))

(defn auth-handler [msg conn envl]
  (let [address (common/b64s->utf8s (.next (:in conn)))]
    (cond
      (= address nil) (do
        (common/write-out (:out conn) 
                          "500 malformed username, please transmit in b64")
        envl)
      (not (common/has-account-here address)) (do
        (common/write-out (:out conn) "500 no such user")
        envl)
      :else (do
        (let [user (common/get-user-record address)
              pub-key (common/deserialize-pub-key (:elgamal_pub_key user))
              plain (common/random-bytes 32)
              challange (-> plain
                            (common/eg-encrypt pub-key)
                            (common/bytes->b64s))
              correct-response (common/bytes->b64s plain)]
          (common/write-out (:out conn)
                            "334 Here's the token, try to decrypt it.")
          (common/write-out (:out conn) challange)
          (let [response (.next (:in conn))]
            (if (= response correct-response)
              (do (common/write-out (:out conn) "200 authenticated OK.")
                  (assoc envl :authenticated true))
              (do (common/write-out (:out conn) "500 Incorrect response.")
                  envl))))))))

(def extension-description
  {:name "X-CHAINMAIL-AUTH"
   :advertise true
   :install-handlers (fn [v-map] 
     (assoc v-map "X-CHAINMAIL-AUTH" auth-handler))})

 
