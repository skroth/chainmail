(ns neveragain.pdaparse
  (:require
    (clojure [string :as string]
             [set :as mset])))

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
   :prod-rules {:S #{'(\a :S \b), :ε}}})

(defn coll-flatten
  "Flatten any nested coll structure"
  [coll]
  (apply concat 
         (map (fn [x] (if (coll? x) (coll-flatten x) [x]))
              coll)))

(defn cfg-to-ndpda
  "Takes the description of a context free grammar and returns a 
  non-deterministic push down automaton that recognizes the language generated
  by the context free grammar"
  [cfg]
  ; Build up our q1 transitions and sigma at the same time. We'll pull non
  ; terminal symbols out of sigma later. Every rule in the CFG will end up
  ; as a transition in our NDPDA.
  (loop [q1 [[:q2 :ε :Z :ε]]
         Σ '()
         [[p-sym rules] & remaining] (-> cfg :prod-rules seq)]
    (if p-sym
      ; For each rule S -> s make a transition from q1 to q1 popping and 
      ; reading nothing and pushing s onto stack so whenever we see S in stack
      (recur 
        (apply conj q1
               (map (fn [x] [:q1 :ε p-sym x])
                    rules))
        (conj Σ rules) ; Remember we're going to flatten this
        remaining)
      {:start-state :q0
       :program {:q0 [[:q1 :ε :ε (list (:start-symbol cfg) :Z)]]
                 ; Make a transition from and to q1 for each input terminal
                 ; symbol popping that same symbol from stack
                 :q1 (concat q1
                             (map (fn [x] [:q1 x x :ε]) 
                                  ; Flatten and pull out non-terminals and ε
                                  (mset/difference (set (coll-flatten Σ))
                                                   (set (keys (:prod-rules cfg)))
                                                   #{:ε})))
                 :q2 []}
       :accepting #{:q2}})))

   
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

(defn εpush
  "Pushes all non :ε members of x into y, preserving order of x. X may also be
  a non collecton."
  [x y]
  (if-not (coll? x) 
    (εconj y x)
    (apply εconj y (reverse x))))

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
   (if (and (not next-sym) (empty? stack))
     ; If there's nothing left to read and the stack is empty it's time to
     ; check our accepting state.
     (if (current-state (:accepting pda)) true false)
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
                       stack (εpush p-sym
                                    (if (ε? s-sym) stack (rest stack)))]
                   (accepts? pda i-string next-state stack))) valid-trans)))))))
