(ns neveragain.imap
  (:require
    (clojure [string :as string]
             [set :as set-lib])
    (clojure.core [async :refer [>! <! >!! alts! go go-loop]])
    (swiss [arrows :refer :all])
    (clojure.java [jdbc :as j])
    (neveragain [common :as common]
                [settings :as settings]
                [pdaparse :as pp]
                [addresses :as addresses]
                [async-serv :as as]))
  (:import
    (org.mindrot.jbcrypt BCrypt)))

(defn pnr [x] (println x) x)

(defn wrap-pure-imap-verb [func]
  (fn [session r-chan w-chan [_ tag _ args]]
    (let [{response :response new-session :session} (func args session)]
      (if (sequential? response)
        ; If the wrapped function returned a list or vector send each as a
        ; seperate line with the last one being prefixed by this req's tag.
        (loop [[line & remaining] response]
          (if (empty? remaining)
            (>!! w-chan (str tag \space line "\r\n"))
            (do
              (>!! w-chan (str "* " line "\r\n"))
              (recur remaining))))
        ; Otherwise just send it as it is
        (>!! w-chan (str tag \space response "\r\n")))
      new-session)))


(defmacro require-state 
  "Wraps a pure verb handler to prevent the handler from being executed if 
  `(:state session)`, as per the handlers's binding, is not equal in the 
  `ok-states` hash set."
  [ok-states exp]
  (let [[dsym fname [func & airities]] (macroexpand exp)
        session-sym 'session]
    (list dsym fname
      (conj 
        (for [[sig & body] airities]
          `(~sig
             (if-not (contains? ~ok-states (:state ~session-sym))
               {:response (format (str "BAD This command requires one of the "
                                       "following states: %s")
                                  (string/join ", " ~ok-states))
                              
                :session ~session-sym}
               (do ~@body))))
        func))))

(defn wrap-require-state 
  [ok-states func]
  (fn [args session]
    (if-not (contains? ok-states (:state session))
      {:response (format (str "BAD This command requires one of the "
                              "following states: %s")
                   (string/join ", " ok-states))
       :session session}
      (func args session))))

(defn box->tag
  "Given a mailbox name per IMAP's idea of mailboxes, return an internal tag
  name."
  [s]
  (let [norm (str "MB-" s)]
    (cond
      (= norm "MB-INBOX") "\\Inbox"
      (= norm "MB-*") "*"
      (= norm "MB-%") "*"
      :else norm)))

(defn tag->box
  "Given an internal tag name return an IMAP mailbox name that would normalize
  to it."
  [s]
  (let [[_ _ tag-style mb-style wierd] (re-matches #"(\\(.+)|MB-(.+)|(.+))" s)
        norm (or tag-style mb-style wierd)]
    (if (= tag-style "Inbox") "INBOX" norm)))

(defn noop [args session]
  (if args
    {:response "BAD NOOP accepts no arguments."
     :session session}
    {:response "OK NOOP complete."
     :session session}))

(defn logout [args session]
  (if args
    {:response "BAD LOGOUT accepts no arguments."
     :session session}
    {:response ["BYE Chainmail IMAP server logging out."
                "OK LOGOUT complete."]
     :session nil}))

(defn capability [args session]
  {:session session
   :response ["CAPABILITY IMAP4rev1 STARTTLS LOGIN"
              "OK CAPABILITY completed"]})

(require-state #{nil}
(defn login 
  ([args session]
   (login args session settings/db))
  ([args session db]
    (let [[_ username password] (re-matches #"^(\S+|\".+\"\S+) (\S+)$" args)
          username (common/strip-quotes username)
          password (common/strip-quotes password)]
      (if-not (and username password)
        {:response "BAD LOGIN should be of the form `LOGIN USERNAME PASSWORD`."
         :session session}
        (let [user (common/get-user-record username db)]
          (cond
            (not user)
             {:response (format "NO \"%s\" is not a knight of THIS table."
                                username)
              :session session}
            (not (BCrypt/checkpw password (:hashword user)))
             {:response "NO Account recognized but password did not match."
              :session session}
            :else
             {:response "OK LOGIN successful."
              :session (merge session {:user user
                                       :state "authenticated"})})))))))

(def mailbox-count-sql "SELECT COUNT(*) AS count
                       FROM tags
                       WHERE 
                         owner_id = ? AND
                         name = ?;")

(def recent-count-sql "SELECT COUNT(*) AS count 
                       FROM tags AS tags1
                       JOIN tags AS tags2 ON
                         tags1.message_id = tags2.message_id
                       WHERE
                         tags1.owner_id=? AND
                         tags1.name=? AND
                         tags2.name='\\Recent';")

(def clear-recent-sql "DELETE FROM tags 
                       WHERE
                        id IN (
                          SELECT t1.id FROM tags AS t1
                          JOIN tags AS t2 ON
                            t1.message_id = t2.message_id
                          WHERE
                            t1.name = '\\Recent' AND
                            t1.owner_id = ? AND
                            t2.name = ?);")

; All messages in a box without the \Seen tag on them
(def unread-count-sql "SELECT COUNT(*) AS count 
                       FROM tags AS tags1 
                       LEFT OUTER JOIN tags AS tags2 ON 
                         tags1.message_id = tags2.message_id AND 
                         tags2.name=\"\\Seen\" 
                       WHERE 
                         tags2.id IS NULL AND
                         tags1.owner_id = ? AND
                         tags1.name = ?;")

(def first-unread-seq-num-sql "SELECT seq_num FROM messages 
                               LEFT OUTER JOIN tags AS tags1 ON 
                                 messages.id = tags1.message_id AND 
                                 tags1.name=\"\\Seen\" 
                               WHERE 
                                 tags1.id IS NULL AND
                                 messages.recipient_id = ?
                             INTERSECT
                               SELECT seq_num FROM messages
                               JOIN tags AS tags2 ON
                                 messages.id = tags2.message_id
                               WHERE
                                 tags2.name = ? AND
                                 messages.recipient_id = ?
                             ORDER BY seq_num ASC
                             LIMIT 1;")

(def flags-in-mailbox "SELECT DISTINCT tags2.name 
                       FROM tags AS tags1
                       JOIN tags AS tags2 ON
                         tags1.message_id = tags2.message_id
                       WHERE 
                         tags1.owner_id = ? AND
                         tags1.name = ? AND
                         tags2.name LIKE '\\%';")

(require-state #{"authenticated" "selected"}
(defn select 
  ([args session]
   (select args session settings/db))
  ([args session db]
   ; Users only have one mailbox, so we don't make the user/mailbox distinction
   (let [user-id (-> session :user :id)
         box-name (box->tag (common/strip-quotes args))
         selected-box (->> [box-name user-id]
                           (concat ["SELECT * FROM platonic_tags
                                    WHERE name=? AND owner_id=?"])
                           (j/query db)
                           first)]
     (if (not selected-box) 
       {:response "NO Mailbox does not exist."
        :session session}
       (let [exists-count (->> [mailbox-count-sql user-id box-name]
                               (j/query db)
                               first
                               :count)
             recent-count (->> [recent-count-sql user-id box-name]
                               (j/query db)
                               first
                               :count)
             unseen-seq-num (->> [first-unread-seq-num-sql user-id 
                                  box-name user-id]
                                 (j/query db)
                                 first
                                 :seq_num)
             flags-list (->> [flags-in-mailbox user-id box-name]
                             (j/query db)
                             (map :name)
                             (string/join ", "))]
         ; We just told the user about all those messages, so clear the
         ; /Recent flags
         (if-not (:read-only session)
           (j/execute! db [clear-recent-sql user-id box-name]))

         ; And give them our response
         (let [response [(format "%d EXISTS" exists-count)
                         (format "%d RECENT" recent-count)
                         (format "FLAGS (%s)" flags-list)]
               unseen-line (format "OK [UNSEEN %d]" unseen-seq-num)
               complete-line "OK SELECT command complete"]

           {:response (if unseen-seq-num
                        (conj response unseen-line complete-line)
                        (conj response complete-line))
            :session (merge session {:selected-box selected-box
                                     :state "selected"})})))))))

(require-state #{"authenticated" "selected"}
(defn examine 
  ([args session]
   (examine args session settings/db))
  ([args session db]
   (select args (assoc session :read-only true) db))))


(require-state #{"authenticated" "selected"}
(defn create
  ([args session]
   (create args session settings/db))
  ([args session db]
   (let [[tag & xs]  (->> args 
                          addresses/quote-atom-split 
                          (map common/strip-quotes)) ]
     (cond 
       (not (empty? xs))
         {:session session
          :response "BAD Hark knave! Thou protest too keenly! (too many args)"}
       (empty? tag)
         {:session session
          :response "BAD Hark knave! Thou protest too weakly! (too few args)"}
       :else
         (if (first (j/query db ["SELECT * FROM platonic_tags
                                 WHERE name=? AND owner_id=?"
                                 (box->tag tag)
                                 (-> session :user :id)]))
           {:session session
            :response (str "NO Hark knave! Thou shalt not usurp that title! "
                           "(mailbox name already exists)")}
           (do
             (->> {:name (box->tag tag) :owner_id (-> session :user :id)}
                  (j/insert! db :platonic_tags)
                  (first)
                  ((keyword "last_insert_rowid()")))
             {:session session
              :response "OK Hail! Thy quest hath succeeded! (mailbox created)"}
             )))))))

(require-state #{"authenticated" "selected"}
  (defn delete
    ([args session]
     (delete args session settings/db))
    ([args session db]
     {:response (str "NO Users can not delete mailboxes through the IMAP "
                     "interface.")
      :session session})))

(require-state #{"authenticated" "selected"}
  (defn subscribe
    ([args session]
     (subscribe args session settings/db))
    ([args session db]
     (let [parsed (addresses/parse-address args)
           sub-box (common/get-user-record args db)]
       (cond
         (not sub-box) {:response "BAD Indicated mailbox does not exist"
                        :session session}
         (not (addresses/addr-equality args 
                                       (addresses/c-addr (:user session))))
           {:response "NO You can't subscribe to that mailbox"}
         :else
           {:response (format "OK Subscribed to %s" args)
            :session (assoc session 
                            :subscriptions 
                            (conj (:subscriptions session) 
                                  (:norm-addr parsed)))})))))

(require-state #{"authenticated" "selected"}
  (defn lsub
    ([args session]
     (subscribe args session settings/db))
    ([args session db]
     nil)))

(def fetch-macros
  {"ALL" #{:FLAGS :INTERNALDATE :RFC822.SIZE :ENVELOPE}
   "FAST" #{:FLAGS :INTERNALDATE :RFC822.SIZE}
   "FULL" #{:FLAGS :INTERNALDATE :RFC822.SIZE :ENVELOPE :BODY}})

(def message-fields
  #{:BODY :BODY.PEAK :ENVELOPE :FLAGS :INTERNALDATE :RFC822 :RFC822.HEADER
    :RFC822.SIZE :RFC822.TEXT :UID})

(defn inclusive-range 
  "Like builtin range but is inclusive on both sides."
  ([stop]
   (inclusive-range 0 stop 1))
  ([start stop]
   (inclusive-range start stop 1))
  ([start stop step]
   (range start (inc stop) step)))

(def fetch-range-grammar
  {:start-symbol :S
   :prod-rules {
     :S #{:single :set :range}
     :single #{:number}
     :set #{'(\( :set-member :set-rest \))}
     :set-rest #{'(\, :set-member :set-rest) :ε}
     :set-member #{:number}
     :range #{'(\( :left-bound \: :right-bound \))}
     :left-bound #{:number}
     :right-bound #{:number}
     :number (conj (set (map (fn [x] (list (char x) :number)) 
                             (range 48 58)))
                   :ε)}})

(def fetch-range-pda (pp/cfg-to-ndpda fetch-range-grammar))

(defn parseInt [x] (Integer/parseInt x))

(defn raw-fetch-numbers
  "Takes a sequence/uid number/set/range as a string and returns all the 
  numbers identified by it as a collection. For testing only"
  [s]
  (let [[accepted captured] (pp/parse fetch-range-pda s
                                      #{:single :set :range :set-member
                                        :left-bound :right-bound})
        parts (pp/extract s captured)]
    (cond
      (not accepted) nil
      (:single parts) [(-> parts :single first parseInt)]
      (:set parts) (map parseInt (:set-member parts))
      (:range parts) 
        (inclusive-range (-> parts :left-bound first parseInt)
                         (-> parts :right-bound first parseInt))
      :else (throw (Throwable. "Parse accepted string but captured nothing.")))))

(defn gen-range-where-clause 
  "Given a string representing a fetch style number set (either UIDs or
  sequence numbers) return a collection (sql, vals) where sql is boolen SQL
  part of a WHERE clause and vals is an ordered collection of values to pass
  to the sanitizer that will be used in that clause. Vals may contain one or
  more value and should be passed to the sanatizer concatinated to any other
  paramaters. `col-name` specifies the name of the column that the returned
  sql will limit on.
  
  e.x. (user)=>(gen-range-where-clause \"(2:10)\" \"seq_num\")
  (\"seq_num >= ? AND seq_num <= 10\" [2 10])"
  [s col-name])

(defn |_|n54ƒ3
  "Like the thing above but only returns sql and probably unsafe."
  [s col-name]
  (let [[accepted captured] (pp/parse fetch-range-pda s
                                      #{:single :set :range :set-member
                                        :left-bound :right-bound})
        parts (pp/extract s captured)]
    ; TODO: Have a sane person look at this and tell how bad of an idea it is.
    (cond
      (not accepted) nil
      (:single parts) 
        (format "%s = %d" col-name (-> parts :single first parseInt))
      (:set parts) 
        (format "%s IN (%s)" col-name 
          (string/join ", " 
                       (map (fn [x] (format "%d" (parseInt x))) 
                            (:set-member parts))))
      (:range parts) 
        (format "%s >= %d AND %s <= %d"
                col-name (-> parts :left-bound first parseInt)
                col-name (-> parts :right-bound first parseInt))
      :else 
        (throw (Throwable. "Parse accepted string but captured nothing.")))))



(defn parse-fetch-args 
  "Takes an arg string for the IMAP FETCH command and parses it into a vector
  of sequence numbers and a set of keywords indicating valid fields specified
  by the arg string. Will expand `:` sequence syntax, so 2:4 will expand to 
  [2 3 4]. Will expand rfc3501 defined macros so ALL will expand to [:FLAGS
  :INTERNALDATE :RFC822.SIZE]."
  [args &{:keys [UID]
          :or   {UID false}}]
  (let [[seq-nums item-names & other] (addresses/quote-atom-split args 
                                                                  \space 
                                                                  \( \))]
    (if other 
      nil ; Args list is too long, something is wrong
      [(|_|n54ƒ3 seq-nums (if UID "id" "seq_num"))
       (cond ; Part two, the message fields
         (contains? fetch-macros item-names)
           (get fetch-macros item-names)
         (contains? message-fields (keyword item-names))
           #{(keyword item-names)}
         (re-matches #"\(([a-zA-Z0-9.]+)([\s,][a-zA-Z0-9.]+)*\)" item-names)
           (-<> item-names
                (.substring 1 (dec (count item-names)))
                (string/split #"[\s,]+")
                (map keyword <>)
                (set)
                (set-lib/intersection message-fields))
         :else nil)])))

(def fetch-query
  "SELECT * FROM messages 
  JOIN tags ON
    tags.message_id = messages.id
  WHERE 
    recipient_id = ? AND 
    tags.name = ? AND 
    %s;")

(defn format-record
  "Takes a database record and formats it as one 'line' to be sent over imap"
  [record session UID]
  (let [wrapped (common/daemon-wrap record 
                                    (addresses/c-addr (:user session)))
        wrapped-len (alength (.getBytes wrapped "UTF-8"))
        cur-num ((if UID :id :seq_num) record)]
    (format "%d FETCH (BODY {%d}%s)" cur-num wrapped-len wrapped)))

(require-state #{"selected"}
(defn fetch
  ([args session]
   (fetch args session settings/db))
  ([args session db &{:keys [UID]
                      :or   {UID false}}]
   (let [[where-sql fields] (parse-fetch-args args)
         box-id (:selected-box session)]
     (if-not (and where-sql fields)
       {:response "BAD Malformed FETCH arguments."
        :session session}
       (let [sql (format fetch-query where-sql)
             records (j/query db [sql (-> session :user :id) box-id])]
         {:session session
          :response (conj (into [] (map (fn [x] (format-record x session UID)) 
                                        records))
                          "OK FETCH complete. Hail milord!")}))))))
(defn uid-fetch [] nil)

(def uid-handler-map
  {"FETCH" uid-fetch})

(defn uid-mux
  "Technically an IMAP verb, only exists to delegate to the UID forms of other
  verbs."
  ([args session]
   (uid-mux args session settings/db))
  ([args session db]
   (let [[_ d-verb d-args] (re-matches #"(?i)(FETCH) +(.+)$" args)]
     (if-not d-verb
       {:session session
        :response "BAD Nay knave! Thine query possesseth not the UID aspect!"}
       ((uid-handler-map d-verb) d-verb d-args db)))))


(def select-mailbox-sql 
  "SELECT * FROM platonic_tags WHERE owner_id = ? AND name = ?;") 

(def select-all-mailboxes-sql 
  "SELECT * FROM platonic_tags 
    WHERE 
      owner_id = ? AND 
      (name = ? OR 1);") 

(require-state #{"authenticated" "selected"}
(defn list-verb
  ([args session]
   (list-verb args session settings/db))
  ([args session db]
   (let [[left-part right-part & remaining] (addresses/quote-atom-split args)
         left-part (common/strip-quotes left-part)
         right-part (common/strip-quotes right-part)
         tag-name (->> [left-part right-part]
                       (filter (fn [x] (pos? (count x))))
                       (string/join "." )
                       (box->tag))]
     (cond
       (not (and left-part right-part))
         {:session session
          :response "BAD Hark knave, thou laketh in arguments!"}
       (not (empty? remaining))
         {:session session
          :response "BAD Hark knave, thou hath inundated me with arguments!"}
       :else
         (let [sql (if (= tag-name "*") 
                     select-all-mailboxes-sql 
                     select-mailbox-sql)
               records (j/query db [sql (-> session :user :id) tag-name])
               lines (for [box records] (format "LIST () NIL %s"
                                                (tag->box (:name box))))]
           {:session session
            :response (conj (into [] lines) 
                            "OK LIST completed, my liege.")}))))))

(def null-verb
  (wrap-pure-imap-verb
    (fn 
      ([args session db]
       (fetch args session))
      ([args session]
       {:response "BAD No such verb."
        :session session}))))

(def handler-map {"NOOP" (wrap-pure-imap-verb noop)
                  "CAPABILITY" (wrap-pure-imap-verb capability)
                  "LOGIN" (wrap-pure-imap-verb login)
                  "SELECT" (wrap-pure-imap-verb select)
                  "CREATE" (wrap-pure-imap-verb create)
                  "LIST" (wrap-pure-imap-verb list-verb)
                  "DELETE" (wrap-pure-imap-verb delete)
                  "SUBSCRIBE" (wrap-pure-imap-verb subscribe)
                  "FETCH" (wrap-pure-imap-verb fetch)
                  "LOGOUT" (wrap-pure-imap-verb logout)
                  "UID" (wrap-pure-imap-verb uid-mux)})

(defn connection-handler
  [r-chan w-chan]
  (>!! w-chan 
       "* OK Hail! ChainMail IMAP server at thine service my liege!\r\n")
  (go-loop [read-val (<! r-chan)
            session {}]
    (let [[line tag verb args] (re-matches #"(.+?)\s(\S+)\s?(.+)?" read-val)
          handler (get handler-map (.toUpperCase verb) null-verb)
          new-session (handler session r-chan w-chan [line tag verb args])]
      (recur (<! r-chan) new-session))))

(defn serve-forever
  [port]
  (as/serve-forever port connection-handler))

(defn -main [& args]
  (serve-forever 1337))
