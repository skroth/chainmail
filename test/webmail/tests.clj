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

(j/db-do-commands test-db
  (str
    "PRAGMA writable_schema = 1;
     delete from sqlite_master where type = 'table';
     PRAGMA writable_schema = 0;
     VACUUM;"
   (slurp "src/clojure/neveragain/schema.sql")
   (slurp "test/neveragain/testdata.sql")))

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

;(deftest test-key-pair-generation
;  (let [kp (common/gen-key-pair)]
;    (is (instance? KeyPair kp))
;    (is (re-matches #"\d+/\d+/\d+" (common/serialize-pub-key (.getPublic kp))))))
