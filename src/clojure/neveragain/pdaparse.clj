(ns neveragain.pdaparse
  (:require
    (clojure [string :as string]
             [set :as mset])))

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
      ; it will be "replaced" by s
      (recur 
        (if (every? char? rules)
          ; If this transition only adds non-terminal characters we can 
          ; optimize by making the input symbol a set and making the push
          ; symbol be whatever the input symbol was. The presence of :<> tells
          ; the intrepreter to not pop from the input string as well.
          (conj q1 [:q1 rules p-sym :<>])

          ; Otherwise make epsilon transitions replacing the non-terminal
          ; symbol with each of it's possible expansions per the CFG.
          (apply conj q1
                 (map (fn [x] [:q1 :ε p-sym x]) rules)))
        (conj Σ rules) ; Remember we're going to flatten this
        remaining)
      ; All NDPFAs will look like q0 -> q1 -> q2 with the same accepting
      ; configuration and transitions save those form q1 to itself.
      {:start-state :q0 
       ; First move will always be to transform the stack to (first-symbol :Z)
       ; where :Z will designate the end of string symbol.
       :program {:q0 [[:q1 :ε :ε (list (:start-symbol cfg) :Z)]]
                 ; In addition to non terminal symbol expansion, we need to
                 ; make a q1 -> q1 transtion poping the same symbol from stack
                 ; and input for every terminal symbol.
                 :q1 (concat q1
                             (map (fn [x] [:q1 x x :ε]) 
                                  (mset/difference (set (coll-flatten Σ))
                                                   (set (keys (:prod-rules cfg)))
                                                   #{:ε})))
                 ; q2 doesn't do anything, it just accepts.
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
     ; check if current-state is accepting.
     (if (current-state (:accepting pda)) true false)

     ; Otherwise figure out which transitions we can make given the current
     ; configuration.
     (let [transitions (-> pda :program current-state)
           valid-trans (filter (fn [[_ i-sym s-sym __]]
                                (and (ε= i-sym next-sym)
                                     (ε= s-sym (first stack))))
                               transitions)]

       ; Some debugging stuff. This will get removed eventually.
       ;(if-not (empty? valid-trans) (do
       ; (println "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~")
       ; (println "Input: " (conj input-string next-sym))
       ; (println "State: " current-state)
       ; (println "Stack: " stack)
       ; (println "Valid: " valid-trans)))

       ; If there's no valid moves for us to make and we're here it means
       ; there's no path to an accepting state, computation has "locked", and
       ; this particular search path does not accept the input string.
       (if-not (seq valid-trans) false
         ; But if that isn't the case make the appropriate adjustments to the
         ; configuration and recur for each potential transition.
         (true? (some (fn [[next-state i-sym s-sym p-sym]]
                 ; If this is an ε transition then we don't touch the input
                 ; string, we just manipulate the stack and carry on. If this
                 ; transition uses the special :<> p-symbol it means we're
                 ; cloning the current input symbol onto the stack and still
                 ; don't touch the input string.
                 (let [i-string (if (or (ε? i-sym) (= p-sym :<>))
                                  (conj input-string next-sym) 
                                  input-string)
                       ; Likewise, if the transition doesn't care about stack
                       ; state we don't pop anything. Again, the :<> symbol
                       ; is a special value flagging that we should push 
                       ; next-sym on to the stack.
                       stack (εpush (if (= p-sym :<>) next-sym p-sym)
                                    (if (ε? s-sym) stack (rest stack)))]
                   (accepts? pda i-string next-state stack))) valid-trans)))))))
