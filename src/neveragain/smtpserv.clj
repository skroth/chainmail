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

(defn m-branch [[[test branch] & remaining]]
	(if (do test)
		(branch)
		(recur remaining)))

(def verb-handler-map {
	"MAIL" (fn [msg conn session-data]
		(let [from-matcher (.matcher #"(?i)MAIL FROM:\<(.+@.+\.[a-zA-Z]{2,4})?\>" msg)
				matches (.matches from-matcher)
				address (if matches (.group from-matcher 1) nil)]
			(if-not matches
				(do
					(write-out (:out conn) "500 Invalid paramaters for MAIL verb")
					session-data)
				(do
					(write-out (:out conn) "250 OK") 
					; set session-data -> envl -> from to the address captured above
					(assoc session-data :envl (assoc
						(:envl session-data) :from address))))))

	"RCPT" (fn [msg conn session-data]
		(let [from-matcher (.matcher #"(?i)RCPT TO:\<(.+@.+\.[a-zA-Z]{2,4})?\>" msg)
				matches (.matches from-matcher)
				address (if matches (.group from-matcher 1) nil)]
			(m-branch [
				[(not matches) (fn []
					(write-out (:out conn) "500 Invalid paramaters for RCPT verb")
					session-data)]

				[(not (has-account-here address)) (fn []
					(write-out (:out conn) "550 No such recipient here")
					session-data)]

				[(not false) (fn []
					(write-out (:out conn) "250 Cool beans")
					session-data)]])))

	"HELO" (fn [msg conn session-data]
		(write-out (:out conn) 
			(str "250 " (get-hostname)))
		(assoc session-data :who (get (string/split msg #"\s" 1) 1)))

	"QUIT" (fn [msg conn session-data]
		(write-out (:out conn) 
			(str "221 " (get-hostname) " Service closing transmission channel"))
		(.close (:socket conn))
		nil)

	"RSET" (fn [msg conn session-data]
		(write-out (:out conn) "250 OK")
		(dissoc session-data :envl))

	"NOOP" (fn [msg conn session-data]
		(write-out (:out conn) "250 OK")
		session-data)
	})

(defn respond [conn msg session-data]
	; Pop out the verb, force uppercase, execute corrosponding function
	((get 
		verb-handler-map
		(string/upper-case (get (string/split msg #"\s") 0))
		(fn [msg conn session-data]
			; Backup func in case we don't have a handler for this verb
			(write-out (:out conn) "unknown verb")
			 session-data)
	) msg conn session-data))

(defn handle-conn [conn]
	; For the mistified check out the actual spec followed here 
	; [http://tools.ietf.org/html/rfc2821] and this invaluable guide 
	; [http://cr.yp.to/smtp.html]
	(write-out (:out conn) (str "220 " (get-hostname) " Neveragain SMTP Service"))

	; Not sure what the idiomatic way to do multi-way branching is but this
	; seems to work. Every function is supposed to return session-data, and in
	; this way modify session state. If a handler function retuns nil instead we
	; take that to mean this sessions has ended.
	(loop [session-data {:envl {}}]
		(let [msg (.readLine (:in conn))]
			(let [modified-session-data (respond conn msg session-data)]
				(if-not (= modified-session-data nil)
					(recur modified-session-data))))))

(defn serve-forever [thread-count]
	(let [serv-socket (ServerSocket. 2500)]
		(println "Serving on port 25")
		(while (= 1 1)
			(let [client-socket (.accept serv-socket)
	        in (BufferedReader. (InputStreamReader. (.getInputStream client-socket)))
	        out (PrintWriter. (.getOutputStream client-socket))]
				(handle-conn {:in in :out out :socket client-socket})
			))))

(serve-forever 2)
