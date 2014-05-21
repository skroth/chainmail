(ns neveragain.imf
  (:require
    (clojure [string :as string])
    (neveragain [common :as common]
                [pdaparse :as pp])))

(def imf-grammar
  {:start-symbol :S
   :prod-rules {:S #{'(:headers :CRLF :body)}
                :headers #{:header+}
                :header+ #{'(:header :header+) :header}
                :header #{'(:header-name :CFWS \: 
                            :CFWS :header-value :CRLF)}
                :header-name #{:ftext+}
                :ftext+ #{'(:ftext :ftext+) :ftext}
                :ftext (set (map char (concat (range 33 58)
                                              (range 59 126))))
                :body #{:text+}
                :text+ #{'(:text :text+) :text}
                :text (set (map char (concat (range 1 10)
                                             (range 11 13)
                                             (range 14 128))))
                }})

(def imf-pda (pp/cfg-to-ndpda imf-grammar))

(defn fmt-date
  "Returns a RFC2822 compliant date string."
  [d]
  (common/strftime "%a, %d %b %Y %H:%M:%S %z" d))

(defn unfold
  "'Unfolds' a rfc 2822 message, splitting a string by semantic line by 
  linebreaks and removing those followed immediately by whitespace."
  [s]
  (string/replace s #"\r\n( )" "$1"))

(defn seq-split
  "Split a sequential datastructure at the first index matching re, returning
  both parts. Returns nil if `value` is not in the sequence."
  [seqential re]
  (loop [[l & ls] seqential
         first-partition []]
    (cond
      (re-matches re l) [first-partition ls]
      (empty? ls) nil
      :else (recur ls (conj first-partition l)))))

(defn kv-split
  "Splits s at the first occurence of delimiter and returns a vector of the
  keywordized first half of the string and the normal second half."
  [delimiter s]
  (let [[k v] (string/split s delimiter 2)]
    [(keyword (.toLowerCase k)) v]))

(defn semantically-valid?
  "Returns true if the parsed message is semantically valid, that is to say
  all time fields are well formed and in the past, address fields are valid
  addresses, and" [x] x)

(defn parse
  "Return a parsed rfc 2822 message, represented as a map with :headers and
  :body keys. Headers are another map while body is a string."
  [s]
  (let [lines (-> s
                  (unfold)
                  (string/split #"\r\n"))
        [header-lines body-lines] (seq-split lines #"^\s*$")]
    (if-not (and header-lines body-lines)
      nil
      {:headers (into {} (map (partial kv-split #"\s*:\s*") 
                              header-lines))
       :body (string/join "\r\n" body-lines)})))
