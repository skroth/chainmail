(ns neveragain.tests
  (:require
    (clojure [test :refer :all])
    (clojure [string :as string])
    (clojure.java [jdbc :as j])
    [clojure.data.codec.base64 :as b64]
    (neveragain [common :as common]
                [addresses :as addresses]))
  (:import
    (java.lang String)
    (java.security KeyPair PublicKey PrivateKey)
    (org.bouncycastle.crypto.params KeyParameter)
    (org.bouncycastle.crypto.engines AESFastEngine)
    (neveragain CustomPublicKey)))

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

(deftest test-key-pair-generation
  (let [kp (common/gen-key-pair)]
    (is (instance? KeyPair kp))
    (is (instance? CustomPublicKey
                   (common/deserialize-pub-key (common/serialize-pub-key (.getPublic kp)))))))

(deftest test-aes-key-generation
  (let [key (common/gen-aes-key)]
    (is (instance? KeyParameter key))))

(deftest aes-test (let [
    in (.getBytes "oh hai there!!!!")
    out (byte-array 16)
    key (KeyParameter. (.getBytes "aaaaaaaaaaaaaaaaaaaaaaaa"))
    eng (AESFastEngine.)]
  (.init eng true key)
  (.processBlock eng in 0 out 0)
  (println (apply str (map char (b64/encode out))))))

(def long-body
  (str "The quick brown fox jumped over the lazy dog. No one was "
       "expecting this turn of events but nonetheless it happened "
       "and we're all just going to have to deal with that. Some "
       "people may have a hard time coping with with springy nature "
       "of certian foxes, but untimately this is the world in which "
       "we exist and nothing we can do will change the reality of "
       "mamaloid who wish to, even for the briefest of moment, "
       "unbind themselves form the earth and take to the sky, above "
       "or about canines!"))


(deftest test-prep-2822-message
  (let [res (common/prep-2822-message {:Content-Type "text/plain"}
                                      long-body)]
    (is (= 2 (count (string/split res #"(\r\n){2}"))))
    (is (loop [[line & remaining] (string/split res #"\r\n")]
          (cond
            (> (count line) 80) false
            (seq remaining) (recur remaining)
            :else true)))))

(deftest test-rewrite-for-forwarding
  (let [envl {:from "jimmy.hoffa@nowhere.mx"
              :recipients ["lanny@neveraga.in"]
              :data "Waddup amigo!"}
        user (common/get-user-record "lanny@neveraga.in" test-db)
        res (common/rewrite-for-forwarding envl
                                           user
                                           "lan.rogers.book@gmail.com")]
    ; TODO: test something meaningful here, probably involving parsing
    (println res)
    (is (seq res))
    (is (re-matches #"^[a-z]+@.+$" (:from res)))))

(deftest test-has-account-here
  ; Let's assume the test data has been loaded someone has the "lanny@neveraga.in" account
  (is (common/has-account-here "lanny@neveraga.in"))
  (is (not (common/has-account-here "fred@neveraga.in")))
  (is (not (common/has-account-here "lanny@unregistereddoma.in")))
  (is (common/has-account-here "l.a.nny@neveraga.in"))
  (is (common/has-account-here "lanny+lol@neveraga.in")))

; Addresses stuff
(deftest test-atom-recognition
  (loop [[[s is-dot is-common] & remaining ] [["thisisatest" true true]
                                              ["so.is.this" true true]
                                              ["but$this~isn't" true false]
                                              [".cant.start.with.dots" false false]
                                              ["this(one)should)(fail" false false]
                                              ["unicode is for commies" false false]
                                              ["( ͡° ͜ʖ ͡°)" false false]]]
    (is (= (addresses/dot-atom? s) is-dot))
    (is (= (addresses/common-atom? s) is-common))
    (if (seq remaining) (recur remaining) nil)))


(deftest test-single-address-recognition
  (loop [[[s v w l d] & remaining ] [
          ["lan.rogers.book@gmail.com" true false "lan.rogers.book" "gmail.com"]
          ["lanny@neveraga.in" true false "lanny" "neveraga.in"]
          ["i~am~a~god@north.west" true true "i~am~a~god" "north.west"]
          ["not a valid@address" false true -1 -1]]]
    (is (= (:valid (addresses/parse-address s)) v))
    (is (= (:warning (addresses/parse-address s)) w))
    (if-not (= l -1)
      (is (= (:local-part (addresses/parse-address s)) l)))
    (if-not (= d -1)
      (is (= (:domain (addresses/parse-address s)) d)))

    (if (seq? remaining) (recur remaining) nil)))
