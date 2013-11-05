(ns neveragain.smtpserv
	(:import (java.net ServerSocket)
			 		 (java.io PrintWriter InputStreamReader BufferedReader)))

(defn handle-conn [conn]
	(while (= 1 1)
		(let [msg (.readLine (:in conn))]
			(println msg)
			msg)))

(defn serve-forever []
	(let [serv-socket (ServerSocket. 25)]
		(while (= 1 1)
			(let [client-socket (.accept serv-socket)
	        in (BufferedReader. (InputStreamReader. (.getInputStream client-socket)))
	        out (PrintWriter. (.getOutputStream client-socket))]
				(handle-conn {:in in :out out})
			))))

(serve-forever)
