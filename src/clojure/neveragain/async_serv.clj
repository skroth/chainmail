(ns neveragain.async-serv
  (:require
    (clojure.core [async :refer [>!! >! <! chan alts! alts!! go go-loop]])
    (neveragain [common :as common]))
  (:import
    (neveragain AsyncSocket)
    (java.util Scanner)
    (java.net InetSocketAddress)
    (java.nio ByteBuffer)
    (java.nio.channels ServerSocketChannel)))

(defn read-write!
  "Accepts a connection vector, reads from its reader if possible and pushes 
  the result to its read channel. Vice versa with it's write channel/writer.
  Returns nil if socket has been terminated, true otherwise."
  [[socket r-chan w-chan]]
    (let [in-line (.readLine socket)]
      (if in-line
        (do (println (str "LINE: " in-line))
        (>!! r-chan in-line))))
    [socket r-chan w-chan])

(defn manage-sockets
  "Accepts a channel `new-conns` which will be used to accept new sockets to
  watch. Will asyncronously poll sockets and call `data-handler` when new data
  is available. Sockets will stop being watched when they are closed."
  [new-conns conn-handler]
    (go-loop [conns []]
      ; First do our reads and writes
      (let [handled-conns (->> conns
                               (map read-write!)
                               (filter (complement nil?))
                               (doall))
            [newbie source] (alts! [new-conns] :default :noop)]
        (if-not (= newbie :noop)
          (let [socket (AsyncSocket. newbie)
                r-chan (chan 10)
                w-chan (chan 10)]
            (conn-handler r-chan w-chan)
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
  [r-chan w-chan]
  (go-loop [read-val (<! r-chan)]
    (>! w-chan (str read-val " desu!\r\n"))
    (recur (<! r-chan))))

(defn -main [& args]
  (serve-forever 2000 echo-handler))
