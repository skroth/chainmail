(ns neveragain.pdaparse
  (:require
    (clojure [string :as string])))

(def alpha (set (seq " abcdefghijklmnopqrstuvwxyz")))

(def paren-balancer
  "A PDA that accepts any string with balanced paren pairs."
  {:start-state :q0
   :program {:q0 [[:q0 \( :ε \(]
                  [:q0 \) \( :ε]
                  [:q0 alpha :ε :ε]]}
   :accepting #{:q0}})

(def ab-balancer
  "A PDA that accepts any string of the form a^nb^n."
  {:start-state :q0
   :program {:q0 [[:q0 \a :ε \a]
                  [:q1 \b \a :ε]]
             :q1 [[:q1 \b \a :ε]]}
   :accepting #{:q1}})

(def ab-balanced-cfg
  "A CFG that produces strings of the form a^nb^n."
  {:start-symbol :S
   :prod-rules {:S #{[\a :S \b], []}}})

(defn cfg-to-ndpda
  "Takes the description of a context free grammar and returns a 
  non-deterministic push down automaton that recognizes the language generated
  by the context free grammar"
  [cfg]
  (loop [start-state :q0
         program {:q0 [[:q1 :ε :ε (:start-symbol cfg)]]}
         accepting #{}] ))

(defn ε= 
  "Returns true if `a` and `b` are equal, either is a set which contains the
  other, or either or both are :ε. Behaviour on two sets is undefined."
  [a b]
  (if (some ε? [a b]) true ; Do we have any ε values?
    (let [sym-set (first (filter set? [a b]))
          sym (first (filter (complement set?) [a b]))]
      (if-not sym-set
        (= a b) ; We're just dealing with symbols, simple equality
        (sym-set sym)))))

(defn εconj
  "Conj all non :ε members of `xs` with `coll`."
  [coll & xs]
  (let [xs (filter (fn [x] (not (= x :ε))) xs)]
    (if (empty? xs)
      coll
      (apply conj coll xs))))

(defn ε?
  "Returns true if `x` is the epsilon keyword."
  [x]
  (= x :ε))

(defn accepts?
  "Accepts a description of a PDA and a string, returns true if the PDA accepts
  the string and false otherwise."
  ([pda s]
   (accepts? pda (seq s) (:start-state pda) '()))

  ([pda [next-sym & input-string] current-state stack]
   (if-not next-sym
     ; If there's nothing left to read it's time to return a value
     (if (and (current-state (:accepting pda))
              (empty? stack))
       true false)
     (let [transitions (-> pda :program current-state)
           valid-trans (filter (fn [[_ i-sym s-sym __]]
                                 (and (ε= i-sym next-sym)
                                      (ε= s-sym (first stack))))
                               transitions)]
       (if-not (seq valid-trans) false
         (true? (some (fn [[next-state i-sym s-sym p-sym]]
                 (let [i-string (if (ε? i-sym) ; Don't "read" if this is an ε trans
                                  (conj input-string next-sym) 
                                  input-string)
                       stack (εconj (if (ε? s-sym)
                                      stack (rest stack)) 
                                    p-sym)]
                   (accepts? pda i-string next-state stack))) valid-trans)))))))
