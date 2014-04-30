(ns neveragain.imf-tests
  (:require
    (clojure [test :refer :all]
             [string :as string])
    (neveragain [imf :as imf])))

(deftest test-unfold
  (let [case-one (imf/unfold "this is a test")
        case-two (imf/unfold "this is a\r\ntest of a\r\nmulti line")
        case-three (imf/unfold (str "this is the\r\n most rigerous\r\n"
                                    "test yet. Two lines"))]
    (is (= (count case-one) 1))
    (is (= (count case-two) 3))
    (is (= (count case-two) 2))))

(defn oldify 
  "Make swap unix style line endings for the old ass CRLF style."
  [s]
  (string/replace s #"\n" "\r\n"))

(def exp-one (oldify "Return-Path: 
X-Original-To: mx@neveraga.in
Delivered-To: mx@neveraga.in
To: lanny@neveraga.in
From:lan.rogers.book@gmail.com
Subject: This is a well formed
 email, god damnit!
Message-Id: <20050413022403.4653B14112@gmail.com>
Date: Tue, 12 Apr 2005 22:24:03 -0400 (EDT)
               
Sup braj? This here is an email, beleive it
or not. It has multiple lines and a little bit
of whitespace escapery but it is, to the best
of my knowledge, a valid rfc2822 message."))

(def exp-two (oldify "This: is: not

and it really shouldn't parse"))

(def exp-three (oldify "To: lanny@neveraga.in
From: lan.rogers.book@gmail.com
Subject: This one is a bit better
But the body isn't correctly seperated from the header."))

(def exp-four (oldify "To: lanny@neveraga.in
From: lan.rogers.book@gmail.com
Subject: This one has no body at all!\n"))

(deftest test-parse
  (let [result-one (imf/parse exp-one)
        result-two (imf/parse exp-two)
        result-three (imf/parse exp-three)
        result-four (imf/parse exp-four)]
    (is (nil? result-two))
    (is (nil? result-three))

    (is result-one)
    (is result-two)

    (is (:headers result-one))
    (is (:body result-one))
    (is (= (:To (:headers result-one)) "lanny@neveraga.in"))
    (is (= (:From (:headers result-one)) "lan.rogers.book@gmail.com"))
    )
  )
