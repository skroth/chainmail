(ns neveragain.pdaparse-tests
  (:require
    (clojure [test :refer :all]
             [string :as string])
    (neveragain [pdaparse :as pp])))

(deftest test-accepts
  (loop [[[s pda a] & remaining] [["(())" pp/paren-balancer true]
                                  ["(if (some swims cats) ture false)"
                                   pp/paren-balancer true]
                                  ["(()" pp/paren-balancer false]
                                  ["aabb" pp/ab-balancer true]
                                  ["aaabb" pp/ab-balancer false]]]
    (is (= (pp/accepts? pda s) a))
    (if-not (empty? remaining) (recur remaining))))

(deftest test-ε=
  (is (pp/ε= \a :ε))
  (is (pp/ε= :ε \a))
  (is (pp/ε= \a \a))
  (is (not (pp/ε= \b \a)))
  (is (pp/ε= #{\a \b} \a))
  (is (pp/ε= #{\a \b} \b))
  (is (not (pp/ε= #{\a \b} \c))))

