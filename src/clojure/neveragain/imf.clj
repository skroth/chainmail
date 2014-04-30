(ns neveragain.imf
  (:require
    (clojure [string :as string])
    (neveragain [pdaparse :as pp])))

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
                :text (set (map (char (concat (range 1 10)
                                              (range 11 13)
                                              (range 14 128)))))
                }})

(def imf-pda (pp/cfg-to-ndpda imf-grammar))

(defn unfold
  "'Unfolds' a rfc 2822 message, splitting a string by semantic line by 
  linebreaks and removing those followed immediately by whitespace."
  [s]
  (string/replace s #"\r\n(\s)" "$1"))

(defn parse
  "Return a parsed rfc 2822 message, represented as a map with :headers and
  :body keys. Headers are another map while body is a string."
  [s] s)
