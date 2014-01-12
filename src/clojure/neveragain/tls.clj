(ns neveragain.tls
  (:require 
    (clojure [string :as string])
    [neveragain.common :refer :all]))

(def verb-handler-map {
  "STARTTLS" (fn [msg conn envl]
    (let [from-matcher (.matcher #"(?i)MAIL FROM:\<(.+@.+\.[a-zA-Z]{2,4})?\>" msg)
        matches (.matches from-matcher)
        address (if matches (.group from-matcher 1) nil)]
      (if-not matches
        (do
          (write-out (:out conn) "500 Invalid paramaters for MAIL verb")
          envl)
        (do
          (write-out (:out conn) "250 OK") 
          (assoc envl :from address)))))
  })


(def extension-description {
  :name "STARTTLS"
  :advertise true
  :install-handlers (fn [v-map]
    (merge v-map verb-handler-map))
  })
