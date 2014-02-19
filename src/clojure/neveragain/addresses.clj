(ns neveragain.addresses
  (:require
    (clojure.data.codec [base64 :as b64])
    [clojure.string :as string]))

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
  (let [parts (string/split s #"@")
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
     :domain domain }))

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

(defn parse-address [addr]
  "Takes an address and returns a map of its parts. If the address does not
  parse will still return a map with the :valid field set to false. If the
  address does parse but in such a way that we expect many mail providers
  to not recognize it, the :warning field will be set."
  (if (name-addr? addr)
    (parse-name-addr addr)
    (parse-addr-spec addr)))
