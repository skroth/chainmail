(ns neveragain.imap
  (:require
    (clojure [string :as string]
             [set :as set-lib])
    (swiss [arrows :refer :all])
    (clojure.java [jdbc :as j])
    (neveragain [common :as common]
                [settings :as settings]
                [addresses :as addresses]
                [core :as smtp-core]))
  (:import
    (org.mindrot.jbcrypt BCrypt)))

(defn wrap-pure-imap-verb [func]
  (fn [tag conn args session]
    (let [{resp :response session :session} (func args session)]
      (cond
       (sequential? resp)
         (loop [[line & remaining] resp]
           (if (not (empty? remaining))
             (do
               (.println (:out conn)
                         (str "* " line "\r\n"))
               (recur remaining))
             (do
               (.println (:out conn)
                         (str tag " " line "\r\n"))
               (.flush (:out conn)))))

       (not (empty? resp))
         (common/write-out (:out conn)
                           (str tag " " resp "\r\n")))
      session)))

(defn wrap-required-state [state-name func]
  "Not in use any more"
  (fn [args session]
    (if-not (= (:state session) state-name)
      {:response (str "BAD This command requires the `" state-name "` state.")
       :session session}
      (func args session))))

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

(require-state #{nil}
(defn login 
  ([args session]
   (login args session settings/db))
  ([args session db]
    (let [[_ username password] (re-matches #"^(\S+|\".+\"\S+) (\S+)$" args)]
      (if-not (and username password)
        {:response "BAD LOGIN should be of the form `LOGIN USERNAME PASSWORD`."
         :session session}
        (let [user (common/get-user-record username db)]
          (cond
            (not user)
             {:response "NO No such user here."
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
             {:response [(format "%d EXISTS" exists-count)
                         (format "%d RECENT" recent-count)
                         (format "OK [UNSEEN %d]" unseen-seq-num)
                         (format "FLAGS (%s)" flags-list)
                         "OK SELECT command complete"]
              :session (merge session {:selected-box selected-user
                                       :state "selected"})}))))))

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

(require-state #{"selected"}
  (defn fetch
    ([args session]
     (fetch args session settings/db))
    ([args session db]
     (cond
       (re-matches #"" args)
     nil))))

(def pat #"(\(\d+:\d+\)|\((\d+)(?:\s*,(\d+))*\)|\d+) (ALL|FAST|FULL)")
(re-matches pat "(2:4) ALL")
(re-matches pat "(2,3,4) ALL")
(re-matches pat "(2) FAST")
