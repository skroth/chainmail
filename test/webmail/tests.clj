(ns webmail.tests
  (:require (clojure [test :refer :all])
    [clojure.data.codec.base64 :as b64]
    (clojure.data [json :as json])
    (clojure.java [jdbc :as j])
    [neveragain [common :as common]]
    [webmail [views :as views]])
  (:import
    (java.lang String)))

(def test-db {
  :classname "org.sqlite.JDBC"
  :subprotocol "sqlite"
  :subname "test.db"})

(do (j/db-do-commands test-db
  (str
    "PRAGMA writable_schema = 1;
     delete from sqlite_master where type = 'table';
     PRAGMA writable_schema = 0;
     VACUUM;"
   (slurp "src/clojure/neveragain/schema.sql")
   (slurp "test/neveragain/testdata.sql"))))

(deftest test-make-key
  (let [user (common/get-user-record "lanny@neveraga.in"  test-db)
        old-key (:elgamal_pub_key user)
        raw-resp (views/make-key {:session {:user user}}
                                 test-db)
        resp (json/read-str raw-resp :key-fn keyword)
        new-key (:elgamal_pub_key (common/get-user-record "lanny@neveraga.in"
                                                          test-db))]
    (is (:p resp))
    (is (:x resp))
    (is (:g resp))
    (is (:y resp))
    (is (not (= new-key old-key)))))

(deftest test-address-available
  (let [cases [["lanny@neveraga.in" false]
               ["jimbo@neveraga.in" true]
               ["ziggy@gmail.com" false]]]
    (loop [[[addr should-be-free] & remaining] cases]
      (is (= (:result (json/read-str (views/address-available {:params {"address" addr}}
                                                              test-db)
                                     :key-fn keyword))
             should-be-free))
      (if (seq remaining) (recur remaining))))

  (is (= (:status (views/address-available {:params {}}
                                           test-db))
         422)))

(deftest test-register
  (j/with-db-transaction [test-db test-db]
    (let [old-users-num (->> ["SELECT COUNT(*) AS n FROM users"]
                             (j/query test-db)
                             first
                             :n)
          req {:params {"local-part" "new.account"
                        "domain" "neveraga.in"
                        "password" "testpass"
                        "fullname" "New J. Account"}}
          res (json/read-str (views/register req test-db)
                             :key-fn keyword)
          ; Try the same thing again to make sure we can't register a address/name
          ; combo more than once.
          res-two (json/read-str (views/register req test-db)
                                  :key-fn keyword)
          new-users-num (->> ["SELECT COUNT(*) AS n FROM users"]
                             (j/query test-db)
                             first
                             :n)]
      (is res)
      (is (= (- new-users-num old-users-num) 1))
      (is (:x (:key res)))
      (is (:p (:key res)))
      (is (= (:status res) "success"))
      (is (= (:status res-two) "failure"))
      (is (not (:key res-two)))

      ; Rollback db mutations caused by this test
      (j/db-set-rollback-only! test-db))))
