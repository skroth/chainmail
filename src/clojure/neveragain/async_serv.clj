(ns neveragain.async-serv
  (:require
    (clojure.core [async :refer [>! <! alts! go go-loop]])
    (neveragain [common :as common]))
  (:import
    (java.util Scanner)
    (java.nio.channels ServerSocketChannel)))

(defn read-write
  "Accepts a connection vector, reads from its reader if possible and pushes 
  the result to its read channel. Vice versa with it's write channel/writer.
  Returns nil if socket has been terminated, true otherwise."
  [[sock-chan reader writer r-chan w-chan]]
    (if (.hasNext reader)
      (>! (.next reader) r-chan))

    (let [[out-val source] (alts! [w-chan] :default :noop)]
      (if-not (= out-val :noop)
        (common/write-out write out-val)))
    true)

(defn manage-sockets
  "Accepts a channel `new-conns` which will be used to accept new sockets to
  watch. Will asyncronously poll sockets and call `data-handler` when new data
  is available. Sockets will stop being watched when they are closed."
  [new-conns conn-handler]
    (go-loop [conns []]
      ; First do our reads and writes
      (let [handled-conns (filter (complement nil?) (map read-write conns))
            [newbie source] (alts! [new-conns] :default :noop)]
        (if-not (= newbie :noop)
          (let [reader (Scanner. newbie)
                writer nil
                r-chan (chan 10)
                w-chan (chan 10)]
            (go (conn-handler r-chan w-chan))
            (recur (conj handled-conns [newbie reader writer r-chan w-chan])))
          (recur handled-conns)))))

(defn serve-forever [] nil)

(defn echo-handler
  [r-chan w-chan]
  (while true
    (>! (>! r-chan) w-chan)))

