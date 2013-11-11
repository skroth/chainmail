(ns neveragain.smtpserv
	(:import (java.net ServerSocket InetAddress)
					 (java.util.concurrent Executors)
					 (java.io PrintWriter InputStreamReader BufferedReader)
					 (clojure.java.jdbc))
	(:require (clojure [string :as string]))
	(:load-file "settings.clj"))

(defn write-out [out-writer message]
	(.println out-writer message)
	(.flush out-writer))

(defn get-hostname []
	(.getHostName (InetAddress/getLocalHost)))

(defn has-account-here 
	([address]
		(has-account-here address db))
	([address db]
		(with-connection db
			(with-query-results rs 
				(into [] (concat ["SELECT 1 FROM users WHERE address=? AND hostname=?"] 
					(string/split address #"@")))
				(boolean rs)))))

(defn save-raw-message 
	([message recipient]
		(save-raw-message message recipient db))

	([message recipient db]
		(with-connection db
			(with-query-results user-data 
				(into [] (concat ["SELECT * FROM users WHERE address=? AND hostname=?"] 
					(string/split recipient #"@")))
				(insert-records "messages" {
					:recipient_id (:id user-data)
					:data message
					:recv_date (quot (System/currentTimeMillis) 1000) })))))

(defn proc-envelope [envl]
	(dorun (for [recipient (:recipients envl)]
		(save-raw-message (:data envl) recipient))))

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

				(not (has-account-here address)) (do
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
				(loop [data ""]
					(let [line (.readLine (:in conn))]
						(if (= line ".")
							(do
								(proc-envelope (assoc envl :data data))
								(write-out (:out conn) "250 message accepted")
								{})
							(do
								(recur (str data "\r\n" line)))))))
		))

	"EHLO" (fn [msg conn envl]
		(write-out (:out conn) (str "250-" (get-hostname)))
		(write-out (:out conn) "250 no extensions offered")
		envl)

	"HELO" (fn [msg conn envl]
		(write-out (:out conn) 
			(str "250 " (get-hostname)))
		(assoc envl :who (get (string/split msg #"\s" 1) 1)))

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

(defn respond [conn msg envl]
	; Pop out the verb, force uppercase, execute corrosponding function
	((get 
		verb-handler-map
		(string/upper-case (get (string/split msg #"\s") 0))
		(fn [msg conn envl]
			; Backup func in case we don't have a handler for this verb
			(write-out (:out conn) "unknown verb")
			 envl)
	) msg conn envl))

(defn handle-conn [conn]
	; For the mistified check out the actual spec followed here 
	; [http://tools.ietf.org/html/rfc2821] and this invaluable guide 
	; [http://cr.yp.to/smtp.html]
	(write-out (:out conn) (str "220 " (get-hostname) " Neveragain SMTP Service"))

	; Not sure what the idiomatic way to do multi-way branching is but this
	; seems to work. Every function is supposed to return envl, and in
	; this way modify session state. If a handler function retuns nil instead we
	; take that to mean this sessions has ended.
	(loop [envl {}]
		(let [msg (.readLine (:in conn))]
			(let [modified-envl (respond conn msg envl)]
				(if-not (= modified-envl nil)
					(recur modified-envl))))))

(defn serve-forever [port-number thread-count]
	(let [serv-socket (ServerSocket. port-number)]
		(println (str "Serving on port " port-number))
		(while (= 1 1)
			(let [client-socket (.accept serv-socket)
	        in (BufferedReader. (InputStreamReader. (.getInputStream client-socket)))
	        out (PrintWriter. (.getOutputStream client-socket))]
	      (println "Received a connection!")
				(handle-conn {:in in :out out :socket client-socket})
			))))

(serve-forever 2500 2)
