(ns webmail.tests
  (:use [clojure.java.shell :only [sh]])
  (:require (clojure [test :refer :all])
    [clojure.data.codec.base64 :as b64]
    (clojure.data [json :as json])
    (korma [core :as k]
           [db :as korma.db])
    (neveragain [common :as common]
                [entities :as e])
    [webmail [views :as views]])
  (:import
    (java.lang String)))

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

(deftest test-make-key
  (let [user (common/get-user-record "lanny@neveraga.in")
        old-key (:elgamal_pub_key user)
        raw-resp (views/make-key {:session {:user user}})
        resp (json/read-str raw-resp :key-fn keyword)
        new-key (-> "lanny@neveraga.in"
                    common/get-user-record
                    :elgamal_pub_key)]
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
      (is (= (-> {:params {"address" addr}}
                 (views/address-available)
                 (json/read-str :key-fn keyword)
                 (:result))
             should-be-free))
      (if (seq remaining) (recur remaining))))

  (is (= (:status (views/address-available {:params {}})) 422)))

(deftest test-register
  (let [user-count (fn []
                     (-> (k/select* e/users)
                         (k/aggregate (count :address) :count)
                         (k/exec)
                         (first)
                         (:count)))
        old-users-num (user-count)
        req {:params {"local-part" "new.account"
                      "domain" "neveraga.in"
                      "password" "testpass"
                      "fullname" "New J. Account"}}
        res (json/read-str (views/register req)
                           :key-fn keyword)
        ; Try the same thing again to make sure we can't register a 
        ; address/name combo more than once.
        res-two (json/read-str (views/register req)
                                :key-fn keyword)
        new-users-num (user-count)]
    (is res)
    (is (= (- new-users-num old-users-num) 1))
    (is (:x (:key res)))
    (is (:p (:key res)))
    (is (= (:status res) "success"))
    (is (= (:status res-two) "failure"))
    (is (not (:key res-two)))))
