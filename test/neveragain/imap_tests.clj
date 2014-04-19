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

(deftest test-imap-parse-fetch-args
  (loop [[[s [nums fields]] & remaining] 
         [["5 FLAGS" [[5] #{:FLAGS}]] 
          ["42 (FLAGS ENVELOPE)" [[42] #{:FLAGS :ENVELOPE}]]
          ["42 ALL" [[42] #{:FLAGS :INTERNALDATE :RFC822.SIZE :ENVELOPE}]]
          ["(1,2,3) (FLAGS)" [[1 2 3] #{:FLAGS}]]
          ["(9:11) FAST" [[9 10 11] #{:FLAGS :INTERNALDATE :RFC822.SIZE}]]
          ["(11:9) FAST" [[] #{:FLAGS :INTERNALDATE :RFC822.SIZE}]]
          ["2a FAST" [nil #{:FLAGS :INTERNALDATE :RFC822.SIZE}]]
          ["(1,2) SLOW" [[1 2] nil]]]]
    (let [[r-nums r-fields] (imap/parse-fetch-args s)]
      (is (= r-nums nums))
      (is (= r-fields fields))
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
        case-one (imap/select "lanny@neveraga.in" 
                              {:user user :state "authenticated"}
                              test-db)
        case-two (imap/select "lanny@neveraga.in" 
                              {:user  nil :state nil}
                              test-db)
        case-three (imap/select "frederick@neveraga.in" 
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
        case-one (imap/examine "lanny@neveraga.in" 
                               {:user user :state "authenticated"}
                               test-db)]
    (is (= (-> case-one :session :state) "selected"))
    (is (= (-> case-one :session :read-only) true))
    (is (some (fn [x] (re-matches #"\d+ RECENT" x)) 
              (:response case-one)))))

(deftest test-imap-create
  (let [user (common/get-user-record "lanny@neveraga.in" test-db)
        case-one (imap/create "" {} test-db)
        case-two (imap/create "" {:state "authenticated" :user user} test-db)]
    (is (= (:session case-one) {}))
    (is (re-matches #"^BAD.*" (:response case-one)))
    (is (re-matches #"^NO.*" (:response case-two)))))

(deftest test-imap-delete
  (let [user (common/get-user-record "lanny@neveraga.in" test-db)
        case-one (imap/delete "" {} test-db)
        case-two (imap/delete "" {:state "authenticated" :user user} test-db)]
    (is (= (:session case-one) {}))
    (is (re-matches #"^BAD.*" (:response case-one)))
    (is (re-matches #"^NO.*" (:response case-two)))))

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
                              :selected-box (:id user)
                              :user user
                              :subscriptions #{}}
                             test-db)
        case-two (imap/fetch "999 BODY"
                             {:state "selected" 
                              :selected-box (:id user)
                              :user user
                              :subscriptions #{}}
                             test-db)]
    (println (:response case-one))
    (is (re-matches #"BAD.*" (:response case-two)))
    (is (re-matches #"OK.*" (-> case-one :response last)))
    (is (= (count (:response case-one)) 2))
    (let [[_ size message] (re-matches #"(?s)^\d+ FETCH \(BODY \{(\d+)\}(.+)\)$"
                                       (-> case-one :response first))]
      (is (= (Integer/parseInt size) 
             (alength (.getBytes message "UTF-8")))))))
    