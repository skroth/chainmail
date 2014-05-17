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
    (javax.net.ssl SSLSocket SSLServerSocket)
    (java.net ServerSocket InetAddress)
    (java.util.concurrent Executors)
    (java.util Date)
    (java.io PrintWriter File)
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
  neveragain.x-cm-login/extension-description ])

(defn create-verb-handler-map [enabled]
  (rewrite-ehlo (reduce
    (fn [v-map extension]
      ((:install-handlers extension) v-map))
    {} enabled) enabled))

(def verb-handler-map
  "A map from string verb names to handler functions. Wrap in a atom so we can
  reload when the source files are updated."
  (atom (create-verb-handler-map enabled-extensions)))

(defn reloader [handler-map-atom]
  "Extension descriptions can specify a set of files to watch, this function
  will poll their modification dates and if they've been updated we'll reload
  the corrosponding namespace. Will loop infinitely."
  (let [watched (filter (fn [x] (:watched-files x)) enabled-extensions)
        ; Build up 3-tuples of namespace/watched files/last modifictaion
        ns-file-pairs (for [ext watched]
                        [(:ns ext)
                         (for [path (:watched-files ext)] (File. path))
                         (.getTime (java.util.Date.))])]
    ; This is the core loop, because modification dates will change as the
    ; files are modified we'll continually recur with modified data
    (loop [nfp ns-file-pairs]
      ; Don't want to spend all our CPU time polling files.
      (Thread/sleep (* settings/reload-interval 1000))

      (-> (for [[ns-sym files last-mod] nfp]
            ; Check that at least one file has been modified since we last
            ; loaded it.
            (if (some identity
                      (for [file files] 
                        (> (.lastModified file) last-mod)))
              (do
                ; One has? Great, rebuild the verb handler map
                (println "Reloading ns:" ns-sym)
                (require ns-sym :reload)
                (swap! handler-map-atom
                       (fn [a] (create-verb-handler-map enabled-extensions)))

                ; Update last reload time for this ns to now
                [ns-sym files (.getTime (java.util.Date.))])

              ; No updates? Cool, we'll just reuse this data without changes
              [ns-sym files last-mod]))
          (doall) ; Force those side-effects!
          (recur)))))

(defn respond [conn msg envl]
  ; Pop out the verb, force uppercase, execute corrosponding function
  ((get
    @verb-handler-map
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
  ; Start threads for normal server, TLS server, and reloader
  (let [reloader-future (if (pos? settings/reload-interval)
                          (future (reloader verb-handler-map))
                          (atom nil))
        reg-server (-> (ServerSocket. settings/smtp-port)
                       (serve-forever settings/thread-count)
                       (future))
        ssl-server (-<> [(:key settings/keyfiles)
                         (:cert settings/keyfiles)
                         (:ca settings/keyfiles)]
                        (apply las/ssl-context <>)
                        (las/server-socket "localhost" 
                                           settings/tls-smtp-port))]
    (.setNeedClientAuth ssl-server false)
    (serve-forever ssl-server settings/thread-count)
    (deref reg-server)
    (deref reloader-future)))
