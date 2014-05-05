(ns neveragain.pdaparse
  (:require
    (clojure [string :as string]
             [set :as mset])))

(def alpha (set (map char (concat (range 65 91) (range 97 123) [\space]))))

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

(defn rexp 
  "Walks a nested collection replacing string with char seqs."
  [x]
  (cond
    (string? x) (seq x)
    ;; If we're iterating over a map, (empty <map entry>) always returns nil,
    ;; so we just use a vector instead.
    (coll? x) (into (or (empty x) []) (map rexp x))
    :else x))

(defn expand-strings
  "Takes a CFG and expands every rule containing a string to be a sequence
  of characters, returning the new CFG."
  [cfg]
  (assoc cfg :prod-rules (rexp (:prod-rules cfg))))

(defn cfg-to-ndpda
  "Takes the description of a context free grammar and returns a
  non-deterministic push down automaton that recognizes the language generated
  by the context free grammar"
  [cfg]
  ; Build up our q1 transitions and sigma at the same time. We'll pull non
  ; terminal symbols out of sigma later. Every rule in the CFG will end up
  ; as a transition in our NDPDA.
  (loop [q1 [[:q2 :ε :Z :ε]
             [:q1 :ε :ω :ε]]
         Σ '()
         [[p-sym rules] & remaining] (-> cfg expand-strings :prod-rules seq)]
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

(defn ε?
  "Returns true if `x` is the epsilon keyword."
  [x]
  (= x :ε))

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

(defn last-index
  "Return the index of the last item in coll where (pred x) is logical true."
  ([pred coll]
   (last-index pred coll (-> coll count dec)))
  ([pred coll idx]
   (cond
     (= idx -1) idx
     (pred (get coll idx)) idx
     :else (recur pred coll (dec idx)))))

(defn apply-transition
  "Given a transition and configuration, returns the next configuration after
  the application of the transition as a vector of args for parse. Does not
  check if transition is actually valid."
  [[next-state i-sym s-sym p-sym]
   pda next-sym input-string current-state stack captures cap-hist]
  (let [will-read (not (or (ε? i-sym) (= p-sym :<>)))
        will-capture (captures s-sym)
        will-pop (not (ε? s-sym))
        capture-close (= :ω s-sym)
        i-string (cond
                   (and (not will-read) (nil? next-sym))
                     '()
                   (not will-read)
                     (conj input-string next-sym)
                   will-read input-string)
        stack (if will-pop (rest stack) stack)
        stack (εconj stack (if will-capture :ω :ε))
        stack (εpush (if (= p-sym :<>) next-sym p-sym) stack)
        cap-hist (if will-capture (conj cap-hist [s-sym (count i-string) nil])
                   cap-hist)
        close-target (if capture-close
                       (last-index (fn [[_ __ x]] (nil? x)) cap-hist) 0)
        cap-hist (if capture-close (assoc cap-hist
                                          close-target
                                          (assoc (get cap-hist close-target)
                                                 2 (count i-string)))
                   cap-hist)]

    (list pda i-string next-state stack captures cap-hist)))

(defn first-accepted
  "Calls pred on each member of coll. Expects pred to return a sequential
  datum. Returns the first value of pred that where (first (pred x)) is
  logically true. If none are, returns nil."
  [pred [f & remaining]]
  (if-not f
    nil
    (let [v (pred f)]
      (if (first v) v (recur pred remaining)))))

(defn parse
  "Takes a description of a PDA, a string, and optionally a set of non-terminal
  symbols which will be captured and returned. Returned value is a two item
  list of (accepted, captured) where captured is a map from non-terminal
  symbols to their value within the string."
  {:arglists '([pda string captures])}
  ([pda s captures]
   (parse pda (seq s) (:start-state pda) '() captures []))

  ([pda [next-sym & input-string] current-state stack captures cap-hist]
   (if (and (not next-sym) (empty? stack))
     ; If there's nothing left to read and the stack is empty it's time to
     ; check if current-state is accepting.
     (if (current-state (:accepting pda)) (list true cap-hist) false)

     ; Otherwise figure out which transitions we can make given the current
     ; configuration.
     (let [transitions (-> pda :program current-state)
           valid-trans (filter (fn [[_ i-sym s-sym __]]
                                (and (ε= i-sym next-sym)
                                     (ε= s-sym (first stack))))
                               transitions)]

       ; Some debugging stuff. This will get removed eventually.
       ;(println "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~")
       ;(println "Input: " (conj input-string next-sym))
       ;(println "State: " current-state)
       ;(println "Stack: " stack)
       ;(println "Hist : " cap-hist)
       ;(println "Valid: " valid-trans)

       ; If there's no valid moves for us to make and we're here it means
       ; there's no path to an accepting state, computation has "locked", and
       ; this particular search path does not accept the input string.
       (if-not (seq valid-trans) (list false nil)
         ; But if that isn't the case make the appropriate adjustments to the
         ; configuration and recur for each potential transition.
         (first-accepted
           (fn [trans]
             (apply parse (apply-transition trans pda next-sym input-string
                                            current-state stack captures
                                            cap-hist)))
           valid-trans))))))

(defn accepts?
  "Takes a description of a PDA and a string, returns true if the PDA accepts
  the string and false otherwise."
  [pda s]
  (-> (parse pda s #{})
      first
      true?))

(defn extract 
  "Takes a string and a collection of three tuples of the form [name start
  stop] identifying a substring of s and its name. Returns a map of names to
  sets of substrings identified in parts as having that name. Used with the
  second value in the output of `parse`. If optional argument `singles` is 
  true will assume only one instance of each capture will appear and will
  return a map of string rather than lists."
  [s parts &{:keys [singles]
              :or  {singles false}}]
  (let [len (count s)]
    (loop [[[part start end] & remaining] parts
           r {}]
      (if-not part
        r
        (recur remaining
               (assoc r part
                      (if-not singles
                        (conj (get r part)
                              (subs s (- len start) (- len end)))
                        (subs s (- len start) (- len end)))))))))

