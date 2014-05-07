(ns neveragain.pdaparse-tests
  (:require
    (clojure [test :refer :all]
             [string :as string])
    (neveragain [pdaparse :as pp]
                [addresses :as addresses])))

(deftest test-accepts
  (loop [[[s pda a] & remaining] [["(())" pp/paren-balancer true]
                                  ["(if (some swims cats) ture false)"
                                   pp/paren-balancer true]
                                  ["(()" pp/paren-balancer false]
                                  ["aabb" pp/ab-balancer true]
                                  ["aaabb" pp/ab-balancer false]]]
    (is (= (pp/accepts? pda s) a))
    (if-not (empty? remaining) (recur remaining))))


(deftest test-parse
  (let [address "lan.rogers.book@gmail.com" 
        result (pp/parse (pp/cfg-to-ndpda addresses/addr-spec-grammar)
                         address
                         #{:local-part :domain})
        extracted (pp/extract address (last result))]
    (println result)
    (println extracted)
    (is result)
    (is (= (first (:local-part extracted)) "lan.rogers.book"))
    (is (= (first (:domain extracted))) "gmail.com")))

;(deftest test-cfg-to-ndpda
;  (let [pda (pp/cfg-to-ndpda pp/ab-balanced-cfg)]
;    (is (pp/accepts? pda "aabb"))
;    (is (pp/accepts? pda "aaaaaaaaaabbbbbbbbbb"))
;    (is (not (pp/accepts? pda "aaabb")))
;    (is (not (pp/accepts? pda "aabbb")))
;    (is (not (pp/accepts? pda "bbbaaa")))
;    (is (not (pp/accepts? pda "baaabbb")))))
;
;(deftest test-ε=
;  (is (pp/ε= \a :ε))
;  (is (pp/ε= :ε \a))
;  (is (pp/ε= \a \a))
;  (is (not (pp/ε= \b \a)))
;  (is (pp/ε= #{\a \b} \a))
;  (is (pp/ε= #{\a \b} \b))
;  (is (not (pp/ε= #{\a \b} \c))))

