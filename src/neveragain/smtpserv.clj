(ns neveragain.smtpserv
	(:import (java.net ServerSocket InetAddress)
			 		 (java.io PrintWriter InputStreamReader BufferedReader)))

(require '(clojure [string :as string]))
						
(defn write-out [out-writer message]
	(.println out-writer message)
	(.flush out-writer))

(defn get-hostname []
	(.getHostName (InetAddress/getLocalHost)))

(defn has-account-here [address]
	(true))

(def verb-handler-map {
	"MAIL" (fn [msg conn session-data]
		(let [from-matcher (.matcher #"(?i)MAIL FROM:\<(.*)\>" msg)
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

(defn serve-forever []
	(let [serv-socket (ServerSocket. 25)]
		(println "Serving on port 25")
		(while (= 1 1)
			(let [client-socket (.accept serv-socket)
	        in (BufferedReader. (InputStreamReader. (.getInputStream client-socket)))
	        out (PrintWriter. (.getOutputStream client-socket))]
				(handle-conn {:in in :out out :socket client-socket})
			))))

(serve-forever)
