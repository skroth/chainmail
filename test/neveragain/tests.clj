(ns neveragain.tests
	(:require (clojure [test :refer :all])
		(neveragain [common :as common]))
	(:import 
		(java.lang String)
		(java.security Key KeyPair PublicKey PrivateKey)))

(deftest test-key-pair-generation
	(let [kp (common/gen-key-pair)]
		(is (instance? KeyPair kp))
		(is (re-matches #"\d+/\d+/\d+" (common/serialize-pub-key (.getPublic kp))))))

(deftest test-aes-key-generation
	(let [key (common/gen-aes-key)]
		(is (instance? Key key))))

(deftest test-message-encryption
	(let [plain-text "Alright, the bombing is happening tonight. Whatever you do, don't tell the NSA!"
			kp (common/gen-key-pair)
			pub-key (.getPublic kp)
			[cipher-text cipher-key] (common/encrypt-message plain-text pub-key)]
		(is (not (= (String. cipher-text "UTF-8") plain-text)))
		(let [priv-key (.getPrivate kp)
				decipher-bytes (common/decrypt-message cipher-text cipher-key priv-key)
				decipher-text (String. decipher-bytes "UTF-8")]
			(is (= decipher-text plain-text)))))
