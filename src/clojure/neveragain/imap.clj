(ns neveragain.imap
  (:require
    (clojure [string :as string]
             [set :as set-lib])
    (clojure.core [async :refer [>! <! >!! alts! go go-loop]])
    (swiss [arrows :refer :all])
    (clojure.java [jdbc :as j])
    (neveragain [common :as common]
                [settings :as settings]
                [addresses :as addresses]
                [async-serv :as as]))
  (:import
    (org.mindrot.jbcrypt BCrypt)))

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

(def inbox-count-sql "SELECT COUNT(*) AS count 
                      FROM messages 
                      WHERE recipient_id = ?;")

(def recent-count-sql "SELECT COUNT(*) AS count 
                       FROM messages 
                       INNER JOIN tags ON
                         messages.id = tags.message_id
                       WHERE
                         tags.name = \"\\Recent\" AND
                         messages.recipient_id = ?;")

(def clear-recent-sql "DELETE FROM tags
                       WHERE
                         owner_id = ? AND
                         name = \"\\Recent\";")

; All messages in a box without the \Seen tag on them
(def unread-count-sql "SELECT COUNT(*) AS count FROM messages 
                       LEFT OUTER JOIN tags ON 
                         messages.id = tags.message_id AND 
                         tags.name=\"\\Seen\" 
                       WHERE 
                         tags.id IS NULL AND
                         messages.recipient_id = ?;")

(def first-unread-seq-num-sql "SELECT seq_num FROM messages 
                               LEFT OUTER JOIN tags ON 
                                 messages.id = tags.message_id AND 
                                 tags.name=\"\\Seen\" 
                               WHERE 
                                 tags.id IS NULL AND
                                 messages.recipient_id = ?
                               ORDER BY seq_num ASC
                               LIMIT 1;")

(def flags-in-mailbox "SELECT DISTINCT name FROM tags 
                       WHERE owner_id = ?;")



(require-state #{"authenticated" "selected"}
  (defn select 
    ([args session]
     (select args session settings/db))
    ([args session db]
     ; Users only have one mailbox, so we don't make the user/mailbox distinction
     (let [selected-user (common/get-user-record args db)]
       (cond
         (not selected-user) 
           {:response "NO Mailbox does not exist."
            :session session}
         (not (= (:id selected-user) (:id (:user session))))
           {:response "NO That's not your mailbox."
            :session session}
         :else 
           (let [user-id (:id selected-user)
                 exists-count (->> [inbox-count-sql user-id]
                                   (j/query db)
                                   first
                                   :count)
                 recent-count (->> [recent-count-sql user-id]
                                   (j/query db)
                                   first
                                   :count)
                 unseen-seq-num (->> [first-unread-seq-num-sql user-id]
                                     (j/query db)
                                     first
                                     :seq_num)
                 flags-list (->> [flags-in-mailbox user-id]
                                 (j/query db)
                                 (map :name)
                                 (string/join ", "))]
             ; We just told the user about all those messages, so clear the
             ; /Recent flags
             (if-not (:read-only session)
               (j/execute! db [clear-recent-sql user-id]))

             ; And give them our response
             (let [response [(format "%d EXISTS" exists-count)
                             (format "%d RECENT" recent-count)
                             (format "FLAGS (%s)" flags-list)
                             "OK SELECT command complete"]
                   unseen-line (format "OK [UNSEEN %d]" unseen-seq-num)]
               {:response (if unseen-seq-num
                            (conj response unseen-line)
                            response)
                :session (merge session {:selected-box selected-user
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
     {:response (str "NO Users can not create mailboxes through the IMAP "
                     "interface.")
      :session session})))

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

(defn parse-fetch-args [args]
  "Takes an arg string for the IMAP FETCH command and parses it into a vector
  of sequence numbers and a set of keywords indicating valid fields specified
  by the arg string. Will expand `:` sequence syntax, so 2:4 will expand to 
  [2 3 4]. Will expand rfc3501 defined macros so ALL will expand to [:FLAGS
  :INTERNALDATE :RFC822.SIZE]."
  (let [[seq-nums item-names & other] (addresses/quote-atom-split args 
                                                                  \space 
                                                                  \( \))]
    (if other 
      nil ; Args list is too long, something is wrong
      [(cond ; Part one, the message seq nums
         (re-matches #"\d+" seq-nums)
           [(Integer/parseInt seq-nums)]
         (re-matches #"\((\d+)(\s*,\d+)*\)" seq-nums)
           (-<> seq-nums
                (.substring 1 (dec (count seq-nums)))
                (string/split #"[\s,]+")
                (map (fn [x] (Integer/parseInt x)) <>)
                (vec))
         (re-matches #"\((\d+):(\d+)\)" seq-nums)
           (-<> seq-nums
                (.substring 1 (dec (count seq-nums)))
                (string/split #":")
                (map (fn [x] (Integer/parseInt x)) <>)
                (apply inclusive-range <>)
                (vec))
         :else nil)
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

(def message-by-recipient-seq 
  "SELECT data, aes_key, iv, recv_date FROM messages 
  WHERE 
    recipient_id = ? AND
    seq_num = ?
  LIMIT 1;")

(require-state #{"selected"}
(defn fetch
  ([args session]
   (fetch args session settings/db))
  ([args session db]
   (let [[seq-nums fields] (parse-fetch-args args)
         box-id (:selected-box session)]
     (if-not (and seq-nums fields)
       {:response "BAD Malformed FETCH arguments."
        :session session}
       (loop [[cur-num & remaining] seq-nums
              response []]
         (if-not cur-num
           {:session session
            :response (conj response "OK FETCH completed")}

           ; Ignore fields for the moment, it's not worth diceing up wrapped
           ; messages on the server. The client can worry about it.
           (let [record (->> [message-by-recipient-seq box-id cur-num]
                             (j/query db)
                             (first))
                 wrapped (common/daemon-wrap record 
                                             (addresses/c-addr (:user session)))
                 wrapped-len (alength (.getBytes wrapped "UTF-8"))
                 resp (format "%d FETCH (BODY {%d}%s)" 
                              cur-num wrapped-len wrapped)]
             (if-not record
               {:session session
                :response (format (str "BAD No message in this inbox with "
                                       "sequence number %d.")
                                  cur-num)}
               (recur remaining (conj response resp)))))))))))

(def select-mailbox-sql 
  "SELECT * FROM platonic_tags WHERE owner_id = ? AND name = ?;") 

(def select-all-mailboxes-sql 
  "SELECT * FROM platonic_tags 
    WHERE 
      owner_id = ? AND 
      (name = ? OR 1);") 

(defn box->tag
  "Given a mailbox name per IMAP's idea of mailboxes, return an internal tag
  name."
  [s]
  (let [norm (str "MB-" (.toUpperCase s))]
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
        norm (.toUpperCase (or tag-style mb-style wierd))]
    norm))

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
               lines (for [box records] (str "LIST () \"#users\" \""
                                             (tag->box (:name box)) \"))]
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
                  "LOGOUT" (wrap-pure-imap-verb logout)})

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
