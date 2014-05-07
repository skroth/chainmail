(ns neveragain.addresses
  (:require
    (clojure.data.codec [base64 :as b64])
    (clojure [set :as mset]
             [string :as string])
    (neveragain [pdaparse :as pp])))

(def addr-spec-grammar
  {:start-symbol :S
   :prod-rules {:S #{'(:local-part :sub-box-tail \@ :domain)}
                :sub-box-tail #{'(\+ :sub-box) :ε}
                :sub-box #{:dot-atom}
                :NO-WS-CTL (set (map char (concat (range 1 9)
                                                  (range 14 32)
                                                  [11 12 127])))
                :text (set (map char (concat (range 1 10)
                                             (range 14 128)
                                             [11 12])))

                :atext (mset/union (set (map char (concat (range 48 58)
                                                          (range 65 90)
                                                          (range 97 122))))
                                   #{\! \# \$ \% \& \' \* \- \/ 
                                     \= \? \^ \_ \` \{ \| \} \~})
                :ctext (set (map char (concat (range 1 9)
                                              (range 14 32)
                                              (range 33 40)
                                              (range 42 91)
                                              (range 93 126)
                                              [11 12 127])))
                :r-atext-tail #{'(:atext :r-atext-tail) :ε }
                :r-atext #{'(:atext :r-atext-tail)}
                :atom #{'(:CFWS :atext :CFWS)}
                :WSP #{\space \tab \newline \return}
                :CRLF #{'(\return \newline)}
                :ccontent #{:ctext :comment}
                :rccontent #{'(:ccontent :rccontent) 
                             '(:FWS :ccontent :rccontent)
                             :ε}
                :comment #{'(\( :rccontent \))
                           '(\( :rccontent :FWS \))}
                :RWSP #{'(:WSP :RWSP) :ε}
                :FWS #{'(:WSP :FWS) '(:CRLF :WSP :RWSP)}
                :CFWS #{:ε
                        '(:FWS :comment :CFWS)
                        '(:comment :CFWS)
                        :FWS}
                :DAT-tail #{'(\. :r-atext :DAT-tail) :ε}
                :dot-atom-text #{'(:r-atext :DAT-tail)}
                :dot-atom #{'(:CFWS :dot-atom-text :CFWS)}
                ;:domain-literal #{}
                :box-name #{:dot-atom :quoted-string}
                :local-part #{'(:box-name :sub-box-tail)}
                :domain #{:dot-atom }}});:domain-literal}}})

(def addr-spec-pda (pp/cfg-to-ndpda addr-spec-grammar))

(print (filter (fn [x] (= (nth x 2) :atext)) (-> addr-spec-pda :program :q1)))


(defn quote-atom-split 
  "Takes a string and optionally a seperator (defaults to space), returns a 
   vector of the string split on the seperator so long as it does not occur
   within a balanced double quote pair."
  ([s] (quote-atom-split s \space \" \"))
  ([s sep in-esc out-esc]
   (let [shallow-balance (= in-esc out-esc)]
     (loop [[c & remaining] (seq s)
            next-str []
            r []
            b-depth 0] ; If 0 we're top level and everything is balanced
       (cond
         (and (= c sep) ; Split on the seperator unless we're unbalanced
              (= b-depth 0))
           (recur remaining [] (conj r (apply str next-str)) b-depth)

         (and shallow-balance     ; Special rules if in and out esc chars
              (or (= c out-esc)   ; are the same, only one level then
                  (= c in-esc)))
           (recur remaining (conj next-str c) r 
                  (if (= b-depth 0) 1 0))

         (= c out-esc) ; Otherwise we count balance level
           (recur remaining (conj next-str c) r (dec b-depth))
         (= c in-esc)
           (recur remaining (conj next-str c) r (inc b-depth))

         (seq? remaining) ; Usual case, throw the char in the next-str
           (recur remaining (conj next-str c) r b-depth)

         :else ; If there's nothing left build the final vec and return
           (conj r (apply str (conj next-str c))))))))

(defn atom? [s]
  (boolean (re-matches #"[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+" s)))

(defn dot-atom? [s]
  (boolean (re-matches #"[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~][.a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]*" s)))

(defn common-atom? [s]
  (boolean (re-matches #"[a-zA-Z0-9][.a-zA-Z0-9]*" s)))

(defn quoted-string? [s] false)

(defn domain-literal? [s] false)

(defn strict-name-addr? [s] false)

(defn parse-addr-spec [s]
  (let [parts (-> s
                  (string/lower-case)
                  (string/split #"@"))
        local-part (string/join "@" (butlast parts))
        [box-name sub-box] (string/split local-part #"\+" 2)
        norm-box-name (string/replace box-name #"\." "")
        domain (last parts)]
    {:valid (and (or (dot-atom? box-name)
                     (quoted-string? box-name))
                 (or (dot-atom? domain)
                     (domain-literal? domain)))
     :warning (or (not (common-atom? box-name))
                  (not (common-atom? domain)))
     :local-part local-part
     :box-name box-name
     :sub-box sub-box
     :norm-box-name norm-box-name
     :norm-addr (str norm-box-name "@" domain)
     :domain domain }))

(defn c-addr [user-record]
  "Takes a row from the `users` table and returns the canonical form of the
   address point to that user's mailbox"
  (format "%s@%s" (:box_name user-record) (:hostname user-record)))

(defn addr-equality [addr-one addr-two]
  "Accepts two strings, parses them, and returns true if they both identify 
  the same mailbox, false otherwise."
  (let [parsed-one (parse-addr-spec addr-one)
        parsed-two (parse-addr-spec addr-two)]
    (and (apply = (map :norm-box-name [parsed-one parsed-two]))
         (apply = (map :domain [parsed-one parsed-two])))))

(defn name-addr? [s]
  "In addition to what we find in the spec, we consider space to be a valid
  character in a display-name. For stricter adherence to the spec use
  `strict-name-addr?`. In reality you want this one because literally everyone
  abuses spaces in display names."
  (let [[display-name addr-spec] (re-matches #"([ .a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]*)<(.+)>$" s)]
    (if addr-spec
      (:valid (parse-addr-spec addr-spec))
      false )))

(defn parse-name-addr [s]
  (let [[display-name addr-spec] (re-matches #"([ .a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]*)<(.+)>$" s)
        parse-result (parse-addr-spec addr-spec)]
    (assoc parse-result :dispaly-name display-name)))

;(defn parse-address [addr]
;  "Takes an address and returns a map of its parts. If the address does not
;  parse will still return a map with the :valid field set to false. If the
;  address does parse but in such a way that we expect many mail providers
;  to not recognize it, the :warning field will be set."
;  (if (name-addr? addr)
;    (parse-name-addr addr)
;    (parse-addr-spec addr)))

(defn parse-address [addr]
  (let [l-addr (.toLowerCase addr)
        [valid parsts] (pp/parse addr-spec-pda
                                 l-addr
                                 #{:local-part :box-name :sub-box :domain})]
    (if-not valid
      ; Some of our post-parse touch-up assumes that the address is valid,
      ; if it's not just return now, the rest won't mean anything anyway.
      {:valid false} 
      (let [{:keys [local-part box-name sub-box domain]} 
              (pp/extract l-addr parsts :singles true)
            norm-box-name (string/replace box-name #"\." "")]
        {:valid true
         :warning (or (not (common-atom? local-part))
                      (not (common-atom? domain)))
         :local-part local-part
         :box-name box-name
         :sub-box sub-box
         :norm-box-name norm-box-name
         :norm-addr (str norm-box-name \@ domain)
         :domain domain}))))

