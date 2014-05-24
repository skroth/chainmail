(ns neveragain.imap-tests
  (:require
    (clojure [test :refer :all])
    (clojure.java [jdbc :as j])
    (neveragain [common :as common]
                [imap :as imap])))
      
(defn standard-fixture [f]
  (def test-db {
    :classname "org.sqlite.JDBC"
    :subprotocol "sqlite"
    :subname "test.db"})

  (j/db-do-commands test-db
    "PRAGMA writable_schema = 1;
     delete from sqlite_master where type = 'table';
     PRAGMA writable_schema = 0;
     VACUUM;")

  (j/db-do-commands test-db [(slurp "test/neveragain/testdata.sql")])
  (j/db-do-commands test-db [(slurp "src/clojure/neveragain/schema.sql")])

  (f))

(use-fixtures :once standard-fixture)

;(def long-args "1 (INTERNALDATE UID RFC822.SIZE FLAGS BODY.PEEK[HEADER.FIELDS (date subject from to cc message-id in-reply-to references x-priority x-uniform-type-identifier x-universally-unique-identifier received-spf x-spam-status x-spam-flag)])")

;(time (clojure.pprint/pprint (last (parse-fetch-args long-args))))

(deftest test-imap-parse-fetch-args
  (loop [[[s [nums fields]] & remaining]
         [["5 FLAGS" ["seq_num = 5" #{"FLAGS"}]] 
          ["42 (FLAGS ENVELOPE)" ["seq_num = 42" #{"FLAGS" "ENVELOPE"}]]
          ["42 ALL" ["seq_num = 42" #{"FLAGS" "INTERNALDATE" 
                                      "RFC822.SIZE" "ENVELOPE"}]]
          ["(1,2,3) (FLAGS)" ["seq_num IN (3, 2, 1)" #{"FLAGS"}]]
          ["9:11 FAST" ["seq_num >= 9 AND seq_num <= 11" 
                          #{"FLAGS" "INTERNALDATE" "RFC822.SIZE"}]]
          ["11:9 FAST" ["seq_num >= 11 AND seq_num <= 9"
                          #{"FLAGS" "INTERNALDATE" "RFC822.SIZE"}]]
          ["2a FAST" [nil #{"FLAGS" "INTERNALDATE" "RFC822.SIZE"}]]
          ["(1,2) SLOW" ["seq_num IN (2, 1)" nil]]
          ["1:2* FLAGS" [nil #{"FLAGS"}]]
          ["1:* FLAGS" ["seq_num >= 1" #{"FLAGS"}]]]]
    (let [[r-nums r-fields] (imap/parse-fetch-args s)]
      (is (= r-nums nums))
      (if r-fields
        (is (= fields (-> r-fields :field-name set))))
      (if (not (empty? remaining)) (recur remaining)))))

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
        res-zero (imap/login "singlearg" session test-db)
        res-one (imap/login "jimmy@gmail.com password" session test-db)
        res-two (imap/login "lanny@neveraga.in password" session test-db)
        res-three (imap/login "lanny@neveraga.in passthesaltpls" 
                              session test-db)]
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
  (let [user (common/get-user-record "lanny@neveraga.in" test-db)
        case-one (imap/select "INBOX" 
                              {:user user :state "authenticated"}
                              test-db)
        case-two (imap/select "INBOX" 
                              {:user  nil :state nil}
                              test-db)
        case-three (imap/select "squids" 
                              {:user user :state "authenticated"}
                              test-db)]
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
  (let [user (common/get-user-record "lanny@neveraga.in" test-db)
        case-one (imap/examine "INBOX" 
                               {:user user :state "authenticated"}
                               test-db)]
    (is (= (-> case-one :session :state) "selected"))
    (is (= (-> case-one :session :read-only) true))
    (is (some (fn [x] (re-matches #"\d+ RECENT" x)) 
              (:response case-one)))))


;(j/db-transaction*)
(deftest test-imap-create
  (j/with-db-transaction [tdb test-db]
    (let [user (common/get-user-record "lanny@neveraga.in" tdb)
          case-one (imap/create "" {} tdb)
          case-two (imap/create "" {:state "authenticated" :user user} tdb)
          case-three (imap/create "Breath This Air" 
                                  {:state "authenticated" :user user} tdb)
          case-four (imap/create "\"Trash\"" 
                                 {:state "authenticated" :user user} tdb)
          case-five (imap/create "Trash" 
                                 {:state "authenticated" :user user} tdb)]
      (is (= (:session case-one) {}))
      (is (re-matches #"^BAD.*" (:response case-one)))
      (is (re-matches #"^BAD.*" (:response case-two)))
      (is (re-matches #"^BAD.*" (:response case-three)))
      (is (re-matches #"^OK.*" (:response case-four)))
      (is (re-matches #"^NO.*" (:response case-five)))

      (j/db-set-rollback-only! tdb))))

(deftest test-imap-delete
  (let [user (common/get-user-record "lanny@neveraga.in" test-db)
        _ (imap/create "\"Newsletters\""
                       {:state "authenticated" :user user} test-db)
        case-one (imap/delete "\"Newsletters\"" {} test-db)
        case-two (imap/delete "\"Squids\"" 
                              {:state "authenticated" :user user} test-db)
        case-three (imap/delete "\"Newsletters\"" 
                                {:state "authenticated" :user user} test-db)]
    (is (= (:session case-one) {}))
    (is (re-matches #"^BAD.*" (:response case-one)))
    (is (re-matches #"^NO.*" (:response case-two)))
    (is (re-matches #"^OK.*" (:response case-three)))))

(deftest test-imap-subscribe
  (let [user (common/get-user-record "lanny@neveraga.in" test-db)
        case-one (imap/subscribe "lanny@neveraga.in" 
                                 {:state "authenticated" 
                                  :user user
                                  :subscriptions #{}}
                                 test-db)
        case-two (imap/subscribe "YHWH@neveraga.in"
                                 {:state "authenticated" 
                                  :user user
                                  :subscriptions #{}}
                                 test-db)]
    (is (re-matches #"BAD.*" (:response case-two)))
    (is (re-matches #"OK.*" (:response case-one)))
    (is (empty? (-> case-two :session :subscriptions)))
    (is (not (empty? (-> case-one :session :subscriptions))))
    (is (= (-> case-one :session :subscriptions first) "lanny@neveraga.in"))))


(deftest test-imap-fetch
  (let [user (common/get-user-record "lanny@neveraga.in" test-db)
        case-one (imap/fetch "1 BODY" 
                             {:state "selected" 
                              :selected-box "\\Inbox"
                              :user user
                              :subscriptions #{}}
                             test-db)
        case-two (imap/fetch "999 BODY"
                             {:state "selected" 
                              :selected-box "\\Inbox"
                              :user user
                              :subscriptions #{}}
                             test-db)
        case-three (imap/uid-fetch "1:* (FLAGS UID INTERNALDATE)"
                                   {:state "selected"
                                    :selected-box "\\Inbox"
                                    :user user
                                    :subscriptions #{}}
                                   test-db)]
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
  (let [user (common/get-user-record "lanny@neveraga.in" test-db)
        ; Verbs are supposed to be case insensitive, make sure we end up
        ; getting the correct handler.
        case-one (imap/uid-mux "FeTCH 1:* (FLAGS)"
                               {:state "selected"
                                :selected-box "\\Inbox"
                                :user user
                                :subscriptions #{}}
                               test-db)]

    (is (re-matches #"OK.*" (-> case-one :response last)))))

(deftest test-imap-list
  (let [session {:state "authenticated"
                 :user (common/get-user-record "lanny@neveraga.in" test-db)}
        cases [["\"\" \"INBOX\"" #{"INBOX"}]
               ["\"\" \"*\"" #{"INBOX" "Recent"}]
               ["\"lol\" \"INBOX\"" #{}]
               ["\"\" \"squid\"" #{}]]]
    (loop [[[args return] & remaining] cases]
      (let [{response :response} (imap/list-verb args session test-db)]
        (is (= (count response) (inc (count return))))
        (doall
          (for [line (butlast response)]
            (is (->> line 
                     (re-matches #"^LIST \(\) NIL (.+)$")
                     (second)
                     (contains? return))))))
      (if (not (empty? remaining)) (recur remaining)))))
