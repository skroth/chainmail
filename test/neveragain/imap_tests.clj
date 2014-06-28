(ns neveragain.imap-tests
  (:use [clojure.java.shell :only [sh]])
  (:require
    (clojure [test :refer :all])
    (clojure [pprint :refer :all])
    (clojure.java [jdbc :as j])
    (korma [core :as k]
           [db :as korma.db])
    (neveragain [common :as common]
                [entities :as e]
                [imap :as imap])))

(defn standard-fixture [f]
  (sh "sh" "rebuild_db.sh" "test.db")

  (let [test-db (korma.db/create-db {:classname "org.sqlite.JDBC"
                                     :subprotocol "sqlite"
                                     :subname "test.db"})]
    (korma.db/default-connection test-db)
    (korma.db/with-db test-db (f))))

(defn transact-fixture [f]
  (korma.db/transaction
    (do
      (f)
      (korma.db/rollback))))

(use-fixtures :once standard-fixture)
(use-fixtures :each transact-fixture)

(deftest test-imap-noop
  (let [session {:dummy-key false}
        res-one (imap/noop nil session)
        res-two (imap/noop "I'm a doofus so ima send some args" session)]
    (is (= (:session res-one) session))
    (is (re-matches #"OK.*" (:response res-one)))
    (is (= (:session res-two) session))
    (is (re-matches #"BAD.*" (:response res-two)))))

(deftest test-imap-logout
  (let [session {:dummy-key false}
        res-one (imap/logout nil session)
        res-two (imap/logout "I'm a doofus so ima send some args" session)]
    (is (= (:session res-one) nil))
    (is (sequential? (:response res-one)))
    (is (re-matches #"BYE.*" (first (:response res-one))))
    (is (re-matches #"OK.*" (last (:response res-one))))

    (is (= (:session res-two) session))
    (is (re-matches #"BAD.*" (:response res-two)))))

(deftest test-imap-login
  (let [session {}
        res-zero (imap/login "singlearg" session)
        res-one (imap/login "jimmy@gmail.com password" session)
        res-two (imap/login "lanny@neveraga.in password" session)
        res-three (imap/login "lanny@neveraga.in passthesaltpls" 
                              session)]
    (is (= (:session res-zero) session))
    (is (re-matches #"^BAD.*" (:response res-zero)))

    (is (= (:session res-one) session))
    (is (re-matches #"^NO.*" (:response res-one)))
    (is (= (:session res-two) session))
    (is (re-matches #"^NO.*" (:response res-two)))

    (is (re-matches #"^OK.*" (:response res-three)))
    (is (= (:state (:session res-three)) "authenticated"))
    (is (:user (:session res-three)))))

(deftest test-imap-select
  (let [user (common/get-user-record "lanny@neveraga.in")
        case-one (imap/select "INBOX" 
                              {:user user :state "authenticated"})
        case-two (imap/select "INBOX" 
                              {:user  nil :state nil})
        case-three (imap/select "squids" 
                              {:user user :state "authenticated"})]
    (is (sequential? (:response case-one)))
    (is (some (fn [x] (re-matches #"\d+ EXISTS" x)) 
              (:response case-one)))
    (is (some (fn [x] (re-matches #"\d+ RECENT" x)) 
              (:response case-one)))
    (is (some (fn [x] (re-matches #"FLAGS \(.*\)" x)) 
              (:response case-one)))
    (is (= (-> case-one :session :state) "selected"))
    (is (re-matches #"^OK.*" (last (:response case-one))))
    (is (re-matches #"^BAD.*" (:response case-two)))
    (is (re-matches #"^NO.*" (:response case-three)))))

(deftest test-imap-examine
  (let [user (common/get-user-record "lanny@neveraga.in")
        case-one (imap/examine "INBOX" 
                               {:user user :state "authenticated"})]
    (is (= (-> case-one :session :state) "selected"))
    (is (= (-> case-one :session :read-only) true))
    (is (some (fn [x] (re-matches #"\d+ RECENT" x)) 
              (:response case-one)))))

(deftest test-imap-create
  (let [user (common/get-user-record "lanny@neveraga.in")
        case-one (imap/create "" {})
        case-two (imap/create "" {:state "authenticated" :user user})
        case-three (imap/create "Breath This Air" 
                                {:state "authenticated" :user user})
        case-four (imap/create "\"Trash\"" 
                               {:state "authenticated" :user user})
        case-five (imap/create "Trash" 
                               {:state "authenticated" :user user})]
    (is (= (:session case-one) {}))
    (is (re-matches #"^BAD.*" (:response case-one)))
    (is (re-matches #"^BAD.*" (:response case-two)))
    (is (re-matches #"^BAD.*" (:response case-three)))
    (is (re-matches #"^OK.*" (:response case-four)))
    (is (re-matches #"^NO.*" (:response case-five)))))

(deftest test-imap-delete
  (let [user (common/get-user-record "lanny@neveraga.in")
        _ (imap/create "\"Newsletters\""
                       {:state "authenticated" :user user})
        case-one (imap/delete "\"Newsletters\"" {})
        case-two (imap/delete "\"Squids\"" 
                              {:state "authenticated" :user user})
        case-three (imap/delete "\"Newsletters\"" 
                                {:state "authenticated" :user user})]
    (is (= (:session case-one) {}))
    (is (re-matches #"^BAD.*" (:response case-one)))
    (is (re-matches #"^NO.*" (:response case-two)))
    (is (re-matches #"^OK.*" (:response case-three)))))

(deftest test-imap-rename
    (let [user (common/get-user-record "lanny@neveraga.in")
          sess {:state "authenticated" :user user}
          _ (imap/create "\"Newsletters\"" sess)
          _ (imap/create "\"Salmon\"" sess)
          ; No auth -> BAD
          case-one (imap/rename "\"Newsletters\" \"Timesinks\"" {})
          ; One box name when we expect two -> BAD
          case-two (imap/rename "\"Newsletters\"" sess)
          ; Trying to rename a non-existent box -> NO
          case-three (imap/rename "\"Squids\" \"Octopi\"" sess)
          ; Target name already exists -> NO
          case-four (imap/rename "\"Salmon\" \"Newsletters\"" sess)
          ; All good -> OK
          case-five (imap/rename "\"Newsletters\" \"Timesinks\"" sess)
          ; `Newsletters` doesn't exist anymore -> NO
          case-six (imap/rename "\"Newsletters\" \"Timesinks\"" sess)
          ; Special case, move inbox messages to new box -> OK
          case-seven (imap/rename "\"INBOX\" \"Squids\"" sess)
          ; Special case, move inbox messages to existing box -> OK
          case-eight (imap/rename "\"INBOX\" \"Salmon\"" sess)]
    (is (re-matches #"^BAD.*" (:response case-one)))
    (is (re-matches #"^BAD.*" (:response case-two)))
    (is (re-matches #"^NO.*" (:response case-three)))
    (is (re-matches #"^NO.*" (:response case-four)))
    (is (re-matches #"^OK.*" (:response case-five)))
    (is (re-matches #"^NO.*" (:response case-six)))
    (is (re-matches #"^OK.*" (:response case-seven)))
    (is (re-matches #"^OK.*" (:response case-eight)))))

(deftest test-imap-subscribe
  (let [user (common/get-user-record "lanny@neveraga.in")
        ; OK, All's well
        case-one (imap/subscribe "\"INBOX\""
                                 {:state "authenticated" 
                                  :user user})
        ; NO Newsletters doesn't exist it can't be subscribed to
        case-two (imap/subscribe "Newsletters"
                                 {:state "authenticated" 
                                  :user user
                                  :subscriptions #{}})
        ; OK again, we'll ched the trash sub doesn't get deleted
        case-three (imap/subscribe "INBOX"
                                   {:state "authenticated" 
                                    :user user
                                    :subscriptions #{"MB-TRASH"}})
        ; BAD no mailbox
        case-four (imap/subscribe ""
                                  {:state "authenticated" 
                                   :user user
                                   :subscriptions #{}})]
    (is (re-matches #"^OK.*" (:response case-one)))
    (is (re-matches #"^NO.*" (:response case-two)))
    (is (re-matches #"^OK.*" (:response case-three)))
    (is (re-matches #"^BAD.*" (:response case-four)))

    (is (= (-> case-one :session :subscriptions) #{"\\Inbox"}))
    (is (= (-> case-two :session :subscriptions) #{}))
    (is (= (-> case-three :session :subscriptions) #{"\\Inbox" "MB-TRASH"}))
    (is (= (-> case-four :session :subscriptions) #{}))))

(deftest test-imap-fetch
  (let [user (common/get-user-record "lanny@neveraga.in")
        case-one (imap/fetch "1 BODY" 
                             {:state "selected" 
                              :selected-box "\\Inbox"
                              :user user
                              :subscriptions #{}})
        case-two (imap/fetch "999 BODY"
                             {:state "selected" 
                              :selected-box "\\Inbox"
                              :user user
                              :subscriptions #{}})
        case-three (imap/uid-fetch "1:* (FLAGS UID INTERNALDATE)"
                                   {:state "selected"
                                    :selected-box "\\Inbox"
                                    :user user
                                    :subscriptions #{}})
        case-four (imap/fetch "1 ALL" 
                              {:state "selected" 
                               :selected-box "\\Inbox"
                               :user user
                               :subscriptions #{}})]
    (is (= 1 (count (:response case-two))))
    (is (re-matches #"OK.*" (-> case-one :response last)))
    (is (= 2 (count (:response case-one))))
    (is (< 1 (count (:response case-three))))
    ; Forive the ID regex, but we want this to work regardless of TZ.
    (is (re-matches #"^1 FETCH \(UID \d+ FLAGS \((\\Recent \\Inbox)\) INTERNALDATE (Wed|Thu), (31|01) (Dec|Jan) 19[67][90] \d{2}:\d{2}:\d{2} [+-]\d{4}\).*"
                    (-> case-three :response first)))
    (is (re-matches #"OK.*" (-> case-four :response last)))
    (let [[_ size message] (re-matches 
                             #"(?sm)^\d+ FETCH \(UID \d+ BODY \{(\d+)\}(.+)\)$"
                                       (-> case-one :response first))]
      (is (= (+ 2 (Integer/parseInt size)) ; Compensate for the CRLF
             (alength (.getBytes message "UTF-8")))))))

(deftest test-parse-fetch-args
  (let [[_ c1] (imap/parse-fetch-args "1:* (FLAGS)")
        [_ c2] (imap/parse-fetch-args "1:* ALL")]
    (is (= c1 {:field-name #{"RFC822.SIZE" "FLAGS" "INTERNALDATE" "ENVELOPE"}}))
    (is (= c1 {:field-name '("FLAGS")}))))

;(test-parse-fetch-args)

(deftest test-uid-fetch
  (let [user (common/get-user-record "lanny@neveraga.in")
        ; Verbs are supposed to be case insensitive, make sure we end up
        ; getting the correct handler.
        case-one (imap/uid-mux "FeTCH 1:* (FLAGS)"
                               {:state "selected"
                                :selected-box "\\Inbox"
                                :user user
                                :subscriptions #{}})]

    (is (re-matches #"OK.*" (-> case-one :response last)))))

(deftest test-imap-list
  (let [session {:state "authenticated"
                 :user (common/get-user-record "lanny@neveraga.in")}
        cases [["\"\" \"INBOX\"" #{"INBOX"}]
               ["\"\" \"*\"" #{"INBOX" "Recent"}]
               ["\"lol\" \"INBOX\"" #{}]
               ["\"\" \"squid\"" #{}]]]
    (loop [[[args return] & remaining] cases]
      (let [{response :response} (imap/list-verb args session)]
        (is (= (count response) (inc (count return))))
        (doall
          (for [line (butlast response)]
            (is (->> line 
                     (re-matches #"^LIST \(\) NIL (.+)$")
                     (second)
                     (contains? return))))))
      (if (not (empty? remaining)) (recur remaining)))))
