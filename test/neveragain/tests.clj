(ns neveragain.tests
  (:require
    (clojure [test :refer :all])
    (clojure [string :as string])
    (clojure.java [jdbc :as j])
    [clojure.data.codec.base64 :as b64]
    (neveragain [common :as common]
                [imap :as imap]
                [addresses :as addresses]))
  (:import
    (java.lang String)
    (java.security KeyPair PublicKey PrivateKey)
    (org.bouncycastle.crypto.params KeyParameter)
    (org.bouncycastle.crypto.engines AESFastEngine)
    (neveragain CustomPublicKey)))

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
  (.processBlock eng in 0 out 0)))

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
    (is (seq res))
    (is (re-matches #"^[a-z]+@.+$" (:from res)))))

(deftest test-has-account-here
  ; Let's assume the test data has been loaded someone has the "lanny@neveraga.in" account
  (is (common/has-account-here "lanny@neveraga.in" test-db))
  (is (not (common/has-account-here "fred@neveraga.in" test-db)))
  (is (not (common/has-account-here "lanny@unregistereddoma.in" test-db)))
  (is (common/has-account-here "l.a.nny@neveraga.in" test-db))
  (is (common/has-account-here "lanny+lol@neveraga.in" test-db)))

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
          ["YHWH@God.ng" true false "yhwh" "god.ng"]
          ["i~am~a~god@north.west" true true "i~am~a~god" "north.west"]
          ["not a valid@address" false true -1 -1]]]
    (is (= (:valid (addresses/parse-address s)) v))
    (is (= (:warning (addresses/parse-address s)) w))
    (if-not (= l -1)
      (is (= (:local-part (addresses/parse-address s)) l)))
    (if-not (= d -1)
      (is (= (:domain (addresses/parse-address s)) d)))

    (if (seq? remaining) (recur remaining) nil)))

(deftest test-quote-atom-split
  (is (= (addresses/quote-atom-split "this \"is a\" test") 
         ["this" "\"is a\"" "test"]))
  (is (= (addresses/quote-atom-split "so is this") 
         ["so" "is" "this"]))
  (is (= (addresses/quote-atom-split "this \"one has\" two \"quote pairs\" in it") 
         ["this" "\"one has\"" "two" "\"quote pairs\"" "in" "it"]))
  (is (= (addresses/quote-atom-split "it (works on) parens too" \space \( \)) 
         ["it" "(works on)" "parens" "too"]))
  (is (= (addresses/quote-atom-split "and|'single|quotes'|with|bars" \| \' \') 
         ["and" "'single|quotes'" "with" "bars"])))

(deftest test-address-equality
  (loop [[[a1 a2 e] & remaining]
         [["lan.rogersbook@gmail.com" "lan.rogers.book@gmail.com" true]
          ["lanny+subbox@neveraga.in" "lanny@neveraga.in" true]
          ["lanny@neveraga.in" "lanny@gmail.com" false]
          ["YHWH@dieties.co.uk" "yhwh@dieties.co.uk" true]
          ["ted@socrates.net" "bill@plato.net" false]]]
    (is (= (addresses/addr-equality a1 a2) e))
    (if remaining (recur remaining))))

(deftest test-c-addr
  (is (= (addresses/c-addr {:box_name "lanny"
                            :hostname "neveraga.in"})
         "lanny@neveraga.in")))

; IMAP utils stuff
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


; IMAP commands stuff
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
    (is (some (fn [x] (re-matches #"OK \[UNSEEN \d+\].*" x)) 
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

;(deftest test-imap-lsub
;  (let [case-one (imap/lsub "*@neveraga.in")]))

;(standard-fixture test-imap-select)
