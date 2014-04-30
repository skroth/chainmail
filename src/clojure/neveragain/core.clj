(ns neveragain.core
  (:require
    (clojure [string :as string])
    (neveragain
      [common :refer :all]
      [settings :as settings]
      rfc auth tls x-cm-login)
    (swiss [arrows :refer :all])
    (less.awful [ssl :as las]))

  (:import
    (java.util.concurrent Executors)
    (javax.net.ssl SSLSocket SSLServerSocket)
    (java.net ServerSocket InetAddress)
    (java.util.concurrent Executors)
    (java.io PrintWriter)
    (java.util Scanner NoSuchElementException)))

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
  neveragain.x-cm-login/extension-description
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
      (write-out (:out conn) "500 unknown verb")
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
    (let [msg (try
        (.next (:in inner-conn)) ; Could happen if the client closed the connection.
        (catch NoSuchElementException e nil))]
      (println "C: " msg)
      (if (= msg nil)
        nil
        (let [response (respond inner-conn msg envl)]
          (cond
            (not= (:socket response) nil) (recur envl response)
            (= response nil) nil
            :else (recur response inner-conn)))))))

(defn serve-forever [serv-socket thread-count]
  (let [thread-pool (Executors/newFixedThreadPool thread-count)]
    (println (str "Serving on port " (.getLocalPort serv-socket)))
    (while (= 1 1)
      (let [client-socket (.accept serv-socket)
            conn (make-conn client-socket)]
        (.execute thread-pool (fn [] (handle-conn conn)))))))

(defn -main [& args]
  (println settings/banner)
  (let [reg-server (-> (ServerSocket. settings/smtp-port)
                       (serve-forever settings/thread-count)
                       (future))
        ssl-server (-<> [(:key settings/keyfiles)
                         (:cert settings/keyfiles)
                         (:ca settings/keyfiles)]
                        (apply las/ssl-context <>)
                        (las/server-socket "localhost" settings/tls-smtp-port))]
    (.setNeedClientAuth ssl-server false)
    (serve-forever ssl-server settings/thread-count)
    (deref reg-server)))
