(ns neveragain.async-serv
  (:require
    (clojure.core [async :refer [>!! >! <! chan alts! alts!! go go-loop]])
    (neveragain [common :as common]))
  (:import
    (neveragain AsyncSocket)
    (java.net InetSocketAddress)
    (java.io IOException)
    (java.nio.channels ServerSocketChannel)))

(defn read-write!
  "Accepts a connection vector, reads from its reader if possible and pushes 
  the result to its read channel. Vice versa with it's write channel/writer.
  Returns nil if socket has been terminated, true otherwise."
  [[socket r-chan w-chan]]
  (try
    (let [in-line (.readLine socket)
          [out-line source] (alts!! [w-chan] :default :noop)]
      (if in-line
        (do (println "C: " in-line)
        (>!! r-chan in-line)))
      (if (not (= out-line :noop))
        (do (println "S: " out-line)
        (.write socket out-line)))
      [socket r-chan w-chan])
    (catch IOException e
      (do
        (println "Client disconnected.")
        nil))))

(defn manage-sockets
  "Accepts a channel `new-conns` which will be used to accept new sockets to
  watch. Will asyncronously poll sockets and call `data-handler` when new data
  is available. Sockets will stop being watched when they are closed."
  [new-conns conn-handler]
    (go-loop [conns []]
      ; Yeild for a moment as to not blaze through at 100% CPU usage
      (Thread/sleep 100)

      ; First do our reads and writes
      (let [handled-conns (->> conns
                               (map read-write!)
                               (filter (complement nil?))
                               (doall))
            ; Then check if we have new sockets to watch.
            [newbie source] (alts! [new-conns] :default :noop)]
        (if-not (= newbie :noop)
          (let [socket (AsyncSocket. newbie)
                r-chan (chan 10)
                w-chan (chan 10)]
            (conn-handler r-chan w-chan socket)
            (recur (conj handled-conns [socket r-chan w-chan])))
          (recur handled-conns)))))

(defn serve-forever 
  "Accept new connections on the specified port and arrange for handler to be 
  called with input and output channels which can be used to communicate 
  asynchronously. This function will block indefinitely." 
  [port handler]
  (let [serv-socket (ServerSocketChannel/open)
        conn-chan (chan 10)]
    (.configureBlocking serv-socket true)
    (.bind serv-socket (InetSocketAddress. port) 3)
    (manage-sockets conn-chan handler)
    (println "SERVING ON PORT: " port)
    (while true
      (let [client-socket (.accept serv-socket)]
        (.configureBlocking client-socket false)
        (>!! conn-chan client-socket)))))

(defn echo-handler
  [r-chan w-chan socket]
  (go-loop [read-val (<! r-chan)]
    (>! w-chan (apply str read-val " desu!\r\n"))
    (recur (<! r-chan))))

(defn -main [& args]
  (serve-forever 2000 echo-handler))
