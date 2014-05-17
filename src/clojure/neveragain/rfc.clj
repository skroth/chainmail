(ns neveragain.rfc
  (:require 
    (clojure [string :as string])
    [neveragain.common :refer :all]))

(def verb-handler-map {
  "MAIL" (fn [msg conn envl]
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

  "RCPT" (fn [msg conn envl]
    (let [from-matcher (.matcher #"(?i)RCPT TO:\<(.+@.+\.[a-zA-Z]{2,4})?\>" msg)
        matches (.matches from-matcher)
        address (if matches (.group from-matcher 1) nil)]
      (cond 
        (not matches) (do
          (write-out (:out conn) "500 invalid paramaters for RCPT verb")
          envl)

        (not (or (has-account-here address) (:authenticated envl))) (do
          (write-out (:out conn) "550 no such recipient here")
          envl)

        (not (:from envl)) (do
          (write-out (:out conn) "503 need MAIL directive before RCPT")
          envl)

        :else (do
          (write-out (:out conn) "250 OK clear to transmit data or further recipients")
          (assoc envl :recipients (conj (:recipients envl) address))))))

  "DATA" (fn [msg conn envl]
    (cond
      (not (:from envl)) (do
        (write-out (:out conn) "503 need MAIL directive before DATA")
        envl)

      (not (first (:recipients envl))) (do
        (write-out (:out conn) "503 need at least one recipient before sending DATA")
        envl)

      :else (do
        (write-out (:out conn) "354 clear to transmit data")
        (loop [data ""
            line (.next (:in conn))]
          (if (= line ".")
            (do
              (proc-envelope (assoc envl :data data))
              (write-out (:out conn) "250 message accepted")
              {})
            (recur (str data line "\r\n") (.next (:in conn))))))))

  "EHLO" (fn [msg conn envl]
    (write-out (:out conn) (str "250-" (get-hostname)))
    (write-out (:out conn) "250 no extensions offered")
    envl)

  "HELO" (fn [msg conn envl]
    (write-out (:out conn) (str "250 " (get-hostname)))
    envl)

  "QUIT" (fn [msg conn envl]
    (write-out (:out conn) 
      (str "221 " (get-hostname) " service closing transmission channel"))
    (.close (:socket conn))
    nil)

  "RSET" (fn [msg conn envl]
    (write-out (:out conn) "250 OK")
    (dissoc envl :envl))

  "NOOP" (fn [msg conn envl]
    (write-out (:out conn) "250 OK")
    envl)
  })


(def extension-description {
  :name "rfc2821"
  :advertise false
  :ns (ns-name *ns*)
  :watched-files ["src/clojure/neveragain/rfc.clj"]
  :install-handlers (fn [v-map]
    (merge v-map verb-handler-map))
  })
