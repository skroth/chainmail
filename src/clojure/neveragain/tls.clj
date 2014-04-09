(ns neveragain.tls
	(:require
		(clojure [string :as string])
		(neveragain [common :refer :all]
                [settings :as settings])
    (less.awful [ssl :as las]))
  (:import (javax.net.ssl SSLSocketFactory)))

(defn handle-starttls [msg conn envl]
  (write-out (:out conn) "220 Ready to start TLS")
  (let [sock (.createSocket (.getSocketFactory (las/ssl-context
                                   (:key settings/keyfiles)
                                   (:cert settings/keyfiles)
                                   (:ca settings/keyfiles)))
                 (:socket conn)
                 (.getHostName (.getRemoteSocketAddress (:socket conn)))
                 (.getPort (:socket conn))
                 true)]
    (.setUseClientMode sock false)
    (.setEnabledProtocols sock las/enabled-protocols)
    (.startHandshake sock)
    (make-conn sock)))


(def extension-description {
	:name "STARTTLS"
	:advertise true
	:install-handlers (fn [v-map]
		(merge v-map {"STARTTLS" handle-starttls}))
	})
