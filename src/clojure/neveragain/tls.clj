(ns neveragain.tls
	(:require
		(clojure [string :as string])
		(neveragain [common :refer :all]
                [settings :as settings])
    (less.awful [ssl :as las]))
  (:import (javax.net.ssl SSLSocketFactory)))

(def verb-handler-map {
	"STARTTLS" (fn [msg conn envl]
		(let [sock (.createSocket (.getSocketFactory (las/ssl-context
                                     (:key settings/keyfiles)
                                     (:cert settings/keyfiles)
                                     (:ca settings/keyfiles)))
                   (:socket conn)
                   (.getHostAddress (.getInetAddress (:socket conn)))
                   (.getPort (:socket conn))
                   true)]
      (.setEnabledProtocols sock las/enabled-protocols)
      (make-conn sock)))
  })


(def extension-description {
	:name "STARTTLS"
	:advertise true
	:install-handlers (fn [v-map]
		(merge v-map verb-handler-map))
	})
