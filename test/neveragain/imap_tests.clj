(ns neveragain.imap-tests
  (:use [clojure.java.shell :only [sh]])
  (:require
    (clojure [test :refer :all])
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
        res-zero (imap/login "singlearg" session nil)
        res-one (imap/login "jimmy@gmail.com password" session nil)
        res-two (imap/login "lanny@neveraga.in password" session nil)
        res-three (imap/login "lanny@neveraga.in passthesaltpls" 
                              session nil)]
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
                              {:user user :state "authenticated"}
                              nil)
        case-two (imap/select "INBOX" 
                              {:user  nil :state nil}
                              nil)
        case-three (imap/select "squids" 
                              {:user user :state "authenticated"}
                              nil)]
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
                               {:user user :state "authenticated"}
                               nil)]
    (is (= (-> case-one :session :state) "selected"))
    (is (= (-> case-one :session :read-only) true))
    (is (some (fn [x] (re-matches #"\d+ RECENT" x)) 
              (:response case-one)))))

(deftest test-imap-create
  (let [user (common/get-user-record "lanny@neveraga.in")
        case-one (imap/create "" {} nil)
        case-two (imap/create "" {:state "authenticated" :user user} nil)
        case-three (imap/create "Breath This Air" 
                                {:state "authenticated" :user user} nil)
        case-four (imap/create "\"Trash\"" 
                               {:state "authenticated" :user user} nil)
        case-five (imap/create "Trash" 
                               {:state "authenticated" :user user} nil)]
    (is (= (:session case-one) {}))
    (is (re-matches #"^BAD.*" (:response case-one)))
    (is (re-matches #"^BAD.*" (:response case-two)))
    (is (re-matches #"^BAD.*" (:response case-three)))
    (is (re-matches #"^OK.*" (:response case-four)))
    (is (re-matches #"^NO.*" (:response case-five)))))

;(standard-fixture test-imap-create)

(deftest test-imap-delete
  (let [user (common/get-user-record "lanny@neveraga.in")
        _ (imap/create "\"Newsletters\""
                       {:state "authenticated" :user user} nil)
        case-one (imap/delete "\"Newsletters\"" {} nil)
        case-two (imap/delete "\"Squids\"" 
                              {:state "authenticated" :user user} nil)
        case-three (imap/delete "\"Newsletters\"" 
                                {:state "authenticated" :user user} nil)]
    (is (= (:session case-one) {}))
    (is (re-matches #"^BAD.*" (:response case-one)))
    (is (re-matches #"^NO.*" (:response case-two)))
    (is (re-matches #"^OK.*" (:response case-three)))))

(deftest test-imap-rename
    (let [user (common/get-user-record "lanny@neveraga.in")
          sess {:state "authenticated" :user user}
          _ (imap/create "\"Newsletters\"" sess nil)
          _ (imap/create "\"Salmon\"" sess nil)
          ; No auth -> BAD
          case-one (imap/rename "\"Newsletters\" \"Timesinks\"" {} nil)
          ; One box name when we expect two -> BAD
          case-two (imap/rename "\"Newsletters\"" sess nil)
          ; Trying to rename a non-existent box -> NO
          case-three (imap/rename "\"Squids\" \"Octopi\"" sess nil)
          ; Target name already exists -> NO
          case-four (imap/rename "\"Salmon\" \"Newsletters\"" sess nil)
          ; All good -> OK
          case-five (imap/rename "\"Newsletters\" \"Timesinks\"" sess nil)
          ; `Newsletters` doesn't exist anymore -> NO
          case-six (imap/rename "\"Newsletters\" \"Timesinks\"" sess nil)
          ; Special case, move inbox messages to new box -> OK
          case-seven (imap/rename "\"INBOX\" \"Squids\"" sess nil)
          ; Special case, move inbox messages to existing box -> OK
          case-eight (imap/rename "\"INBOX\" \"Salmon\"" sess nil)]
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
        case-one (imap/subscribe "lanny@neveraga.in" 
                                 {:state "authenticated" 
                                  :user user
                                  :subscriptions #{}}
                                 nil)
        case-two (imap/subscribe "YHWH@neveraga.in"
                                 {:state "authenticated" 
                                  :user user
                                  :subscriptions #{}}
                                 nil)]
    (is (re-matches #"BAD.*" (:response case-two)))
    (is (re-matches #"OK.*" (:response case-one)))
    (is (empty? (-> case-two :session :subscriptions)))
    (is (not (empty? (-> case-one :session :subscriptions))))
    (is (= (-> case-one :session :subscriptions first) "lanny@neveraga.in"))))


(deftest test-imap-fetch
  (let [user (common/get-user-record "lanny@neveraga.in")
        case-one (imap/fetch "1 BODY" 
                             {:state "selected" 
                              :selected-box "\\Inbox"
                              :user user
                              :subscriptions #{}}
                             nil)
        case-two (imap/fetch "999 BODY"
                             {:state "selected" 
                              :selected-box "\\Inbox"
                              :user user
                              :subscriptions #{}}
                             nil)
        case-three (imap/uid-fetch "1:* (FLAGS UID INTERNALDATE)"
                                   {:state "selected"
                                    :selected-box "\\Inbox"
                                    :user user
                                    :subscriptions #{}}
                                   nil)]
    (is (= 1 (count (:response case-two))))
    (is (re-matches #"OK.*" (-> case-one :response last)))
    (is (= 2 (count (:response case-one))))
    (is (< 1 (count (:response case-three))))
    ; Forive the ID regex, but we want this to work regardless of TZ.
    (is (re-matches #"^1 FETCH \(UID \d+ FLAGS \((\\Recent \\Inbox)\) INTERNALDATE (Wed|Thu), (31|01) (Dec|Jan) 19[67][90] \d{2}:\d{2}:\d{2} [+-]\d{4}\).*"
                    (-> case-three :response first)))
    (let [[_ size message] (re-matches 
                             #"(?sm)^\d+ FETCH \(UID \d+ BODY \{(\d+)\}(.+)\)$"
                                       (-> case-one :response first))]
      (is (= (+ 2 (Integer/parseInt size)) ; Compensate for the CRLF
             (alength (.getBytes message "UTF-8")))))))

(deftest test-uid-fetch
  (let [user (common/get-user-record "lanny@neveraga.in")
        ; Verbs are supposed to be case insensitive, make sure we end up
        ; getting the correct handler.
        case-one (imap/uid-mux "FeTCH 1:* (FLAGS)"
                               {:state "selected"
                                :selected-box "\\Inbox"
                                :user user
                                :subscriptions #{}}
                               nil)]

    (is (re-matches #"OK.*" (-> case-one :response last)))))

(deftest test-imap-list
  (let [session {:state "authenticated"
                 :user (common/get-user-record "lanny@neveraga.in")}
        cases [["\"\" \"INBOX\"" #{"INBOX"}]
               ["\"\" \"*\"" #{"INBOX" "Recent"}]
               ["\"lol\" \"INBOX\"" #{}]
               ["\"\" \"squid\"" #{}]]]
    (loop [[[args return] & remaining] cases]
      (let [{response :response} (imap/list-verb args session nil)]
        (is (= (count response) (inc (count return))))
        (doall
          (for [line (butlast response)]
            (is (->> line 
                     (re-matches #"^LIST \(\) NIL (.+)$")
                     (second)
                     (contains? return))))))
      (if (not (empty? remaining)) (recur remaining)))))
