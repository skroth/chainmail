(ns neveragain.imap
  (:require
    (clojure [string :as string]
             [set :as set-lib]
             [pprint :as pprint])
    (clojure.core [async :refer [>! <! >!! go go-loop chan]])
    (swiss [arrows :refer :all])
    (clojure.java [jdbc :as j])
    (neveragain [common :as common]
                [settings :as settings]
                [imf :as imf]
                [pdaparse :as pp]
                [addresses :as addresses]
                [async-serv :as as]))
  (:import
    (java.util Date)
    (java.io File)
    (org.mindrot.jbcrypt BCrypt)))

(def LOID 
  "Convenience constant because :last_insert_rowid() isn't a valid keyword
  literal."
  (keyword "last_insert_rowid()"))

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
  `(:state session)`, as per the handlers's binding, is not in the `ok-states` 
  hash set."
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
      (= norm "MB-") ""
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
                             (string/join " "))]
         ; We just told the user about all those messages, so clear the
         ; /Recent flags
         ; Hmm, scratch that, not sure that's right
         ;(if-not (:read-only session)
         ;  (j/execute! db [clear-recent-sql user-id box-name]))

         ; And give them our response
         (let [response [(format "%d EXISTS" exists-count)
                         (format "%d RECENT" recent-count)
                         (format "FLAGS (%s)" flags-list)]
               unseen-line (format "OK [UNSEEN %d]" unseen-seq-num)
               complete-line "OK SELECT command complete"]

           {:response (if unseen-seq-num
                        (conj response unseen-line complete-line)
                        (conj response complete-line))
            :session (merge session {:selected-box (:name selected-box)
                                     :state "selected"})})))))))

(require-state #{"authenticated" "selected"}
(defn examine 
  ([args session]
   (examine args session settings/db))
  ([args session db]
   (select args (assoc session :read-only true) db))))


(defn tag-exists?
  "Returns true if there exists a platonic tag `name` belonging to `user`."
  [tag user db]
  (->> [tag (:id user)]
       (cons "SELECT COUNT(*) as count FROM platonic_tags 
              WHERE name=? AND owner_id=?")
       (j/query db)
       (first)
       (:count)
       (pos?)))

(require-state #{"authenticated" "selected"}
(defn create
  ([args session]
   (create args session settings/db))
  ([args session db]
   (let [[tag & xs]  (->> args 
                          addresses/quote-atom-split 
                          (map common/strip-quotes)
                          (filter identity)
                          (map box->tag))]
     (cond 
       (not (empty? xs))
         {:session session
          :response "BAD Hark knave! Thou protest too keenly! (too many args)"}
       (empty? tag)
         {:session session
          :response "BAD Hark knave! Thou protest too weakly! (too few args)"}
       (tag-exists? tag (:user session) db)
         {:session session
          :response (str "NO Hark knave! Thou shalt not usurp that title! "
                         "(mailbox name already exists)")}
       :else
         (do
           (->> {:name tag :owner_id (-> session :user :id)}
                (j/insert! db :platonic_tags)
                (first)
                (LOID))
           {:session session
            :response "OK Hail! Thy quest hath succeeded! (mailbox deleted)"}
           ))))))

(require-state #{"authenticated" "selected"}
(defn delete
  ([args session]
   (delete args session settings/db))
  ([args session db]
   (let [[box & xs]  (->> args 
                          addresses/quote-atom-split 
                          (map common/strip-quotes))
         tag (if box (box->tag box) nil)]
     (cond 
       (not (empty? xs))
         {:session session
          :response "BAD Hark knave! Thou protest too keenly! (too many args)"}
       (empty? tag)
         {:session session
          :response "BAD Hark knave! Thou protest too weakly! (too few args)"}
       (not (tag-exists? tag (:user session) db))
         {:session session
          :response (str "NO Hark! The subject of thine query findeth itself "
                         "absent. (no such mailbox).")}
       :else
         (do
           (->> tag
                (conj ["DELETE FROM tags WHERE owner_id = ? AND name = ?"
                       (-> session :user :id)])
                (j/execute! db))
           (->> tag
                (conj ["DELETE FROM platonic_tags 
                        WHERE owner_id = ? AND name = ?"
                       (-> session :user :id)])
                (j/execute! db))
           {:response "OK Hail! Thy quest hath succeeded! (mailbox created)"
            :session session}))))))

(require-state #{"authenticated" "selected"}
(defn rename
  ([args session]
   (rename args session settings/db))
  ([args session db]
   (let [[source target & xs]  (->> args 
                                    addresses/quote-atom-split 
                                    (filter identity)
                                    (map common/strip-quotes)
                                    (map box->tag))
         user (:user session)]
     (cond
       (not (and source target))
         {:response "BAD Hark knave! Thou protest too weakly! (too few args)"
          :session session}
       (seq xs)
         {:response "BAD Hark knave! Thou protest too keenly! (too many args)"
          :session session}
       (not (tag-exists? source user db))
         {:response (str "NO Hark knave! Surely you jest, 'tis no kingdom I "
                         "have ever heard of. (rename source already exists)")
          :session session}
       (= source "\\Inbox")
         ; Special behaviour for inbox source per the spec, we move everything
         ; from there into the target, creating it if need be.
         (do
           (j/insert! db :platonic_tags {:name target :owner_id (:id user)})
           (j/execute! db ["UPDATE tags SET name=? WHERE name=?" target source])
           {:response "OK Hail! Thy quest hath succeeded! (mailbox renamed)"
            :session session})
       ; In the case of inbox moving we actually can move to an existent
       ; target, so do this until after we know this isn't that case.
       (tag-exists? target user db)
         {:response (str "NO Hark knave! Another lord hath laid claim here! "
                         "(rename target already exists)")
          :session session}
       :else
         (do
           (j/execute! db ["UPDATE platonic_tags SET name=? WHERE name=?" 
                           target source])
           (j/execute! db ["UPDATE tags SET name=? WHERE name=?" target source])
           {:response "OK Hail! Thy quest hath succeeded! (mailbox renamed)"
            :session session}))))))

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
  {"ALL"  #{"FLAGS" "INTERNALDATE" "RFC822.SIZE" "ENVELOPE"}
   "FAST" #{"FLAGS" "INTERNALDATE" "RFC822.SIZE"}
   "FULL" #{"FLAGS" "INTERNALDATE" "RFC822.SIZE" "ENVELOPE" "BODY"}})

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
     :range #{'(:left-bound \: :right-bound)}
     :left-bound #{:bound}
     :right-bound #{:bound}
     :diget (set (map char (range 48 58)))
     :number #{:diget '(:diget :number)}
     :bound #{\* :number}}})

(def fetch-fields-grammar
  {:start-symbol :S
   :prod-rules {
     :S #{:field-name '(\( :WSP :field-name+ :WSP \))}
     :field-name+ #{'(:field-name :WSP :field-name+) :ε}
     :field-name #{"BODY" :ebody :pbody "ENVELOPE" "FLAGS" "INTERNALDATE" "UID"
                   "RFC822" "RFC822.HEADER" "RFC822.SIZE" "RFC822.TEXT"}
     :ebody #{(-> (seq "BODY[") (list :section* \]) (flatten))}
     :pbody #{(-> (seq "BODY.PEEK[") (list :section* \]) (flatten))}
     :section* #{'(:section :WSP :section*) :ε}
     :section #{"HEADER" "TEXT" "MIME" :header-fields}
     :header-fields #{(-> "HEADER.FIELDS" 
                          seq (list :WSP \( :hfield+ \)) flatten)}
     :hfield+ #{'(:hfield :WSP :hfield+) :ε}
     :hfield #{:atext+}
     :atext+ #{'(:atext :atext+) :atext}
     :atext (set-lib/union (set (map char (concat (range 48 58)
                                                  (range 65 90)
                                                  (range 97 122))))
                           #{\! \# \$ \% \& \' \* \- \/ 
                             \= \? \^ \_ \` \{ \| \} \~})
     :WSP #{:ε '(\space :WSP) '(\tab :WSP)}}})

(def fetch-range-pda (pp/cfg-to-ndpda fetch-range-grammar))
(def fetch-fields-pda (-> fetch-fields-grammar
                          (pp/expand-strings)
                          (pp/cfg-to-ndpda)))

;(clojure.pprint/pprint fetch-fields-pda)


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
  [s col-name])

(defn |_|n54ƒ3
  "Given a string representing a fetch style number set (either UIDs or
  sequence numbers) and a column name indicating which, returns a sql string 
  that can be included as part of a WHERE clause that will narrow the selection
  to only messages in the specified range.

  e.x. (user)=>(gen-range-where-clause \"(2:10)\" \"seq_num\")
  \"seq_num >= 2 AND seq_num <= 10\"
  
  Note that this function inserts values into the SQL without sanitization."
  [s col-name]
  (let [[accepted captured] (pp/parse fetch-range-pda s
                                      #{:single :set :range :set-member
                                        :left-bound :right-bound})
        parts (pp/extract s captured)]
    ; TODO: Have a sane person look at this and tell me how bad it is.
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
        ; Watch out, it's about to get tricky in here.
        (let [lb (-> parts :left-bound first)
              rb (-> parts :right-bound first)
              ss (filter identity
                         (map (fn [x y] (if (= x "*") nil 
                                          [(str col-name y) (parseInt x)]))
                              [lb rb] [" >= %d" " <= %d"]))]
          (apply format (string/join " AND " (map first ss))
                        (map last ss)))
      :else
        (throw (Throwable. "Parse accepted string but captured nothing.")))))

(def message-captures #{})

(defn parse-fetch-args 
  [args &{:keys [UID]
          :or   {UID false}}]
  (let [[seq-nums item-names & other] (addresses/quote-atom-split args 
                                                                  \space 
                                                                  \( \))]
    (if other 
      nil ; Args list is too long, something is wrong
      [(|_|n54ƒ3 seq-nums (if UID "id" "seq_num"))
       (if (contains? fetch-macros item-names)
         {:field-name (get fetch-macros item-names)}
         (let [[valid captured] (pp/parse fetch-fields-pda item-names
                                          #{:field-name :hfield :section})]
           (if-not valid
             nil (pp/extract item-names captured))))])))

(def fetch-query
  "SELECT * FROM messages 
  JOIN tags ON
    tags.message_id = messages.id
  WHERE 
    recipient_id = ? AND 
    tags.name = ? AND 
    %s;")

(def fetch-flags-sql
  "SELECT name FROM tags
  WHERE
    name LIKE \"\\%\" AND
    message_id = ?")

(defn transmit-fmt
  "Takes a string to be transmitted in the imap style and returns it with
  the appropriate length prefix (assumes UTF-8 encoding)"
  [s]
  (format "{%d}\r\n%s" (alength (.getBytes s "UTF-8")) s))
                

(defn extract-sections
  "Takes a parsed fetch field designator and an IMF message and returns the
  specified parts of the message. Nil or an empty field collection is 
  intrepreted as the whole IMF message."
  [fields message]
  (if (empty? (:section fields))
    (-> message imf/reconstitute transmit-fmt)
    (->> (for [section (:section fields)]
           (cond
             (= section "HEADER")
               (->> message
                    (:headers)
                    (map (fn [[k v]] (str (name k) ": " v)))
                    (string/join "\n"))
             (= section "TEXT")
               (:body message)
             (re-matches #"HEADER.FIELDS\s?\(.+\)" section)
               (let [hfields (set (map (fn [x] (.toLowerCase x)) 
                                       (:hfield fields)))]
                 (->> message
                      (:headers)
                      (filter (fn [[k v]] (contains? hfields (name k))))
                      (map (fn [[k v]] (str (name k) ": " v)))
                      (string/join "\r\n")))
             :else
               (throw (Throwable. "Unrecognized field name"))))
         (string/join "\r\n")
         (transmit-fmt))))

(defn field-sort
  "Comparator function for ordering fileds in a FETCH response."
  [left right]
  (cond
    (= left "UID") -1 
    (= right "UID") 1 
    (re-matches #"^BODY(.PEEK)?\[.*\]$" left) 1
    (re-matches #"^BODY(.PEEK)?\[.*\]$" right) -1
    :else (compare (first left) (first right))))

(defn format-record
  "Takes a database record and formats it as one 'line' to be sent over imap.
  Beware that we may end up changing DB state based on what fields are present."
  [record fields session db UID]
  (let [wrapped (->> session
                     (:user)
                     (addresses/c-addr)
                     (common/daemon-wrap record))
        parsed (imf/parse wrapped)
        cur-num ((if UID :id :seq_num) record)]
    ; UID is implicitly a field in every FETCH command, add it if need be
    (->> (for [field (reverse (if (some (partial = "UID") (:field-name fields))
                                (:field-name fields)
                                (conj (:field-name fields) "UID")))]
           ; Keep the field with the value so we can sort them later.
           [field
            (cond
              (= field "FLAGS")
                (->> [fetch-flags-sql (:id record)]
                     (j/query db)
                     (map :name)
                     (string/join " ")
                     (format "FLAGS (%s)"))
              (= field "UID")
                (format "UID %d" (:id record))
              (= field "INTERNALDATE")
                (->> record
                     (:recv_date)
                     (* 1000)
                     (Date.)
                     (imf/fmt-date)
                     (str "INTERNALDATE "))
              (= field "RFC822.SIZE")
                (->> (.getBytes wrapped "UTF-8")
                     (alength)
                     (format "RFC822.SIZE %d"))
              (= field "BODY")
                (str "BODY " (transmit-fmt wrapped))
              (re-matches #"^BODY.PEEK\[.*\]$" field)
                ; We need to reply with BODY[...] if we were peeking or not
                (str (string/replace field  #"^BODY\.PEEK" "BODY") " "
                     (extract-sections fields parsed))
              (re-matches #"^BODY\[.*\]$" field)
                (do
                  ; Do our database jazz here.
                  (str field " "
                       (extract-sections fields parsed)))
              :else
                (throw (Throwable. "Unrecognized field name")))])
         (sort-by first field-sort)
         (map second) ; Remember they're will 2-tuples
         (string/join " ")
         (format "%d FETCH (%s)" cur-num))))

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
          :response (-<> (fn [x] (format-record x fields session db UID))
                         (map records)
                         (into [] <>)
                         (conj "OK FETCH complete. Hail milord!"))}))))))
(defn uid-fetch 
  ;No variadic form because kwargs and multiple arities don't seem to get along
  [args session db]
  (fetch args session db :UID true))

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
       ((uid-handler-map (.toUpperCase d-verb)) d-args session db)))))

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
    (try
      (let [[line tag verb args] (re-matches #"(.+?)\s(\S+)\s?(.+)?" read-val)]
        (if-not line
          (do
            (>! w-chan "* BAD Hark knave, thine command parses not!\r\n")
            (recur (<! r-chan) session))
          (let [handler (get handler-map (.toUpperCase verb) null-verb)
                new-session (handler session r-chan w-chan [line tag verb args])]
            (recur (<! r-chan) new-session))))
      (catch Exception e
        (do
          (>! w-chan
               "* BAD Hark! Unspecified failure, woe upon thee knave!\r\n")
          (println "Wowah, exception:\n" e)
          (.printStackTrace e))))))

(def imap-ns (ns-name *ns*))

(defn serve-forever
  [port]
  (if (pos?  settings/reload-interval)
    (future ; Run the reloader in another thread
      (loop [file (File. "src/clojure/neveragain/imap.clj")
             last-mod (.lastModified file)]
        (Thread/sleep (* settings/reload-interval 1000))
        (if (> (.lastModified file) last-mod)
          (do
            (println "Reloading imap namespace")
            (require imap-ns :reload)
            (recur file (.lastModified file)))
          (recur file last-mod)))))
  (as/serve-forever port connection-handler))

(defn -main [& args]
  (serve-forever 1337))
