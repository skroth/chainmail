(ns neveragain.core
	(:require 
		(clojure [string :as string])
		(neveragain 
			[common :refer :all] 
			[settings :as settings]
			rfc auth tls))
	(:import 
		(javax.net.ssl SSLSocket)
		(java.net ServerSocket InetAddress)
 		(java.util.concurrent Executors)
		(java.io PrintWriter InputStreamReader BufferedReader)))


(defn rewrite-ehlo [v-map ext-list]
	"Returns a verb handler map with an EHLO verb reflecting ext-list"
	(assoc v-map "EHLO" 
		(fn [msg conn envl]
			(let [exts (filter (fn [ext] (boolean (:advertise ext))) ext-list)
					final (last exts)
					exts (butlast exts)]
				(if-not final
					(write-out (:out conn) (str "250 " (get-hostname)))
					(do
						(write-out (:out conn) (str "250-" (get-hostname)))
						(dorun (for [ext exts]
							(write-out (:out conn) (str "250-" (:name ext)))))
						(write-out (:out conn) (str "250 " (:name final))))))
			; Return a unmodified envl no matter what.
			envl)))

(def enabled-extensions [
	neveragain.rfc/extension-description
	neveragain.auth/extension-description
	neveragain.tls/extension-description
])

(def verb-handler-map (rewrite-ehlo (reduce
	(fn [v-map extension] 
		((:install-handlers extension) v-map)) 
	{} enabled-extensions) enabled-extensions))

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
	(loop [envl {} inner-conn conn]
		(let [msg (.readLine (:in inner-conn))]
			(let [response (respond inner-conn msg envl)]
				(cond 
					(= (type response) SSLSocket) (recur envl response)
					(= response nil) nil
					:else (recur response inner-conn))))))

(defn serve-forever [port-number thread-count]
	(let [serv-socket (ServerSocket. port-number)]
		(println (str "Serving on port " port-number))
		(while (= 1 1)
			(let [client-socket (.accept serv-socket)
	        in (BufferedReader. (InputStreamReader. (.getInputStream client-socket)))
	        out (PrintWriter. (.getOutputStream client-socket))]
				(handle-conn {:in in :out out :socket client-socket})
			))))

(serve-forever settings/smtp-port settings/thread-count)
