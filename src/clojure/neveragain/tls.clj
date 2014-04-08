(ns neveragain.tls
	(:require
		(clojure [string :as string])
		[neveragain.common :refer :all])
  (:import (javax.net.ssl SSLSocketFactory)))

(def verb-handler-map {
	"STARTTLS" (fn [msg conn envl]
		(make-conn (.createSocket (SSLSocketFactory/getDefault) (:socket conn)
                                 (.getHostAddress (.getInetAddress (:socket conn)))
                                 (.getPort (:socket conn))
                                 true)))
	})


(def extension-description {
	:name "STARTTLS"
	:advertise true
	:install-handlers (fn [v-map]
		(merge v-map verb-handler-map))
	})
