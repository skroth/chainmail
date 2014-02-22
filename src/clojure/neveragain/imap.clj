(ns neveragain.imap
  (:require
    (clojure [string :as string])
    (clojure.java [jdbc :as j])
    (neveragain [common :as common]
                [settings :as settings]
                [addresses :as addresses]
                [core :as smtp-core]))
  (:import
    (org.mindrot.jbcrypt BCrypt)))

(defn wrap-pure-imap-verb [func]
  (fn [tag conn args session]
    (let [{resp :response session :session} {}]
      (cond
       (sequential? resp)
         (loop [[line & remaining] resp]
           (if (not (empty? remaining))
             (do
               (common/write-out (:out conn)
                                 (str "* " resp "\r\n"))
               (recur remaining))
             (common/write-out (:out conn)
                               (str tag " " resp "\r\n"))))

       (not resp)
         (common/write-out (:out conn)
                           (str tag " " resp "\r\n")))
      session)))

(defn noop [args session]
  (if args
    {:response "BAD NOOP accepts no arguments."
     :session session}
    {:response "OK NOOP complete."
     :session session}))

(defn logout [args session]
  (if args
    {:response "BAD LOGOUT accepts no arguments."
     :session session}
    {:response ["BYE Chainmail IMAP server logging out."
                "OK LOGOUT complete."]
     :session nil}))

(defn login 
  ([args session]
   (login args session settings/db))
  ([args session db]
    (let [[_ username password] (re-matches #"^(\S+|\".+\"\S+) (\S+)$" args)]
      (if-not (and username password)
        {:response "BAD LOGIN should be of the form `LOGIN USERNAME PASSWORD`."
         :session session}
        (let [user (common/get-user-record username db)]
          (cond
            (not user)
             {:response "NO No such user here."
              :session session}
            (not (BCrypt/checkpw password (:hashword user)))
             {:response "NO Account recognized but password did not match."
              :session session}
            :else
             {:response "OK LOGIN successful."
              :session (merge session {:user user
                                       :state "authenticated"})}))))))
