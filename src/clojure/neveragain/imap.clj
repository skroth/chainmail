(ns neveragain.imap
  (:require
    (clojure [string :as string])
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
  `(:state session)`, as per the handlers's binding, is not equal to 
  `state-name`"
  [state-name exp]
  (let [[dsym fname [func & airities]] (macroexpand exp)
        session-sym 'session]
    (list dsym fname
      (conj 
        (for [[sig & body] airities]
          `(~sig
             (if-not (= (:state ~session-sym) ~state-name)
               {:response "BAD This command requires the `authenticated` state."
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
                                       :state "authenticated"})}))))))

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



(require-state "authenticated"
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
             (j/execute! db [clear-recent-sql user-id])

             ; And give them our response
             {:response [(format "%d EXISTS" exists-count)
                         (format "%d RECENT" recent-count)
                         (format "OK [UNSEEN %d]" unseen-seq-num)
                         (format "FLAGS (%s)" flags-list)
                         "OK SELECT command complete"]
              :session (assoc session :selected-box selected-user) }))))))
