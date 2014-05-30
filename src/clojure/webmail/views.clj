(ns webmail.views
  (:use compojure.core
    ring.util.response)
  (:require
    (neveragain [common :refer :all]
                [entities :as e]
                [settings :as settings]
                [addresses :as addresses])
    (clojure.data [json :as json])
    (clojure.data.codec [base64 :as b64])
    [clojure.string :as string]
    (korma [core :as k])
    (swiss [arrows :refer :all])
    [selmer.parser :as selmer])
  (:import
    (org.mindrot.jbcrypt BCrypt)))

(defn b-and [a b]
  "A simple macro wrapper so we can use `and` as a first class function"
  (and a b))

(defn gen-set-placeholders [items]
  "Returns a string of sql placeholders with one placeholder for each item in
  the supplied sequence."
  (str "(" (string/join ", " (map (constantly "?") items)) ")"))

(defn make-redirect
  ([destination]
    (make-redirect destination "303 Redirected"))
  ([destination message]
    {:status 303
     :body message
     :headers {"Location" destination} }))

(defn login [request]
  (if-not (has-account-here (get (:params request) "address"))
    "No such account here"
    (let [user (get-user-record (get (:params request) "address"))
        password (get (:params request) "password")]
      (if-not (BCrypt/checkpw password (:hashword user))
        "Bad password"
        {:status 303
         :body "Login successful."
         :headers {"Location" "/inbox"}
         :session (assoc (:session request) :user user)}))))

(defn logout [request]
  {:status 200
   :body "Logout successful"
   :session {}})

(defn make-key
  "Generate a new elGamal key pair, store the public material in the database
  and send the private key to the user."
  [{{user :user} :session}]
  (let [key-pair (gen-key-pair)
        pub-key (.getPublic key-pair)
        priv-key (.getPrivate key-pair)]
    (k/update e/users
      (k/set-fields {:elgamal_pub_key (serialize-pub-key pub-key)})
      (k/where {:id (:id user)}))
    (json/write-str
      (reduce
        ; b64 encode the 4 BigIntegers that make up the keypair
        (fn [m [key val]]
          (assoc m key (apply str (map char (b64/encode (.toByteArray val))))))
        {}
        {:p (.getP (.getParams pub-key))
         :g (.getG (.getParams pub-key))
         :y (.getY pub-key)
         :x (.getX priv-key)}))))

(defn send-mail [request]
  (let [user (:user (:session request))
      envl {
        :from (str (:address user) "@" (:hostname user))
        :to (string/split (:recipients (:params request)) #",")
        :data (:data (:params request))}]
    (relay-message envl)
    {:status 200
     :body (json/write-str {:status "success"})}))

(defn orient
  "Returns a JSON object letting a web-client user know some things about
  themself, including what we think their address is and the current state of
  their settings in our db"
  [request]
  (let [user (-> (k/select* e/users)
                 (k/where {:id (:id (:user (:session request)))})
                 (k/exec)
                 (first))]
    (json/write-str {
      :address (str (:address user) "@" (:hostname user))
      :realname (:realname user)
    })))

(defn remove-tag
  "Deletes a set of tags with ids specified in the `tags` get param iff all are
  owned by the user making the request."
  [{{{user-id :id} :user} :session {tags "tags"} :query-params}]
  (if-not tags
    {:status 422
     :body "Hark! Thy request is deficient in its `tags`." }

    (let [tag-ids (string/split tags #",")
          owners (-<> (k/select* e/tags)
                      (k/fields :users_id)
                      (k/where (k/raw (str "id IN " 
                                           (gen-set-placeholders tag-ids))
                                      tag-ids))
                      (k/exec)
                      (map :users_id <>))]
      (cond
        (> (count tag-ids) 50)
          {:status 422
           :body "Hark! Thy askth too much, milord! I can not delete so many!" }
        (not (= (count owners) (count tag-ids)))
          {:status 422
           :body "Hark! One or more of the tags thou asked for art delequent!" }
        (not (every? (partial = user-id) owners))
          {:status 403
           :body (str "Hark! One or more of these is not thy tag to delete! "
                      "Begone knave!")}
        :else 
          (do
            (k/delete e/tags
              (k/where (k/raw (format "id IN (%s)" 
                                (->> tag-ids
                                     (map (fn [x]
                                            (format "%d" 
                                              (Integer/parseInt x))))
                                     (string/join ", "))))))
            {:status 200 :body "Hail! Thy quest succeedeth!"})))))

(defn register
  "Registers a new user"
  [{{:strs [local-part domain full-name password]} :params}]
  (json/write-str
    (let [proposed-address (str local-part "@" domain)
          parsed (addresses/parse-addr-spec proposed-address)]
      (cond
       (not (contains? settings/controlled-domains (:domain parsed)))
        {:status "failure"
         :reason "Hark! That address lieth not within thine lordly domain!"}
       (not (:valid parsed))
        {:status "failure"
         :reason "Hark! Thou hath failed to specify a valid address!"}
       (has-account-here proposed-address)
        {:status "failure"
         :reason "Hark! Some knave hath heretofore snatched thine address!"}
       :else
        (let [key-pair (gen-key-pair)
              pub-key (.getPublic key-pair)
              priv-key (.getPrivate key-pair)]
          (k/insert e/users
            (k/values {:realname full-name
                       :address (:norm-box-name parsed)
                       :box_name (:box-name parsed)
                       :hostname (:domain parsed)
                       :hashword (hash-pass password)
                       :elgamal_pub_key (serialize-pub-key pub-key)}))
          {:status "success"
           :key (json/read-str (serialize-key-pair key-pair))})))))

(defn address-available
  [{{address "address"} :params}]
  (if-not address
    {:status 422
     :body (str "Hark! Even I can not peer beyond the veil of missing "
                "`address` parameters!")}
    (json/write-str
      {:result (and (contains? settings/controlled-domains 
                               (:domain (addresses/parse-address address)))
                    (not (has-account-here address)))})))

(defn index [request]
 (if (:user (:session request))
   (make-redirect "/inbox")
   (make-redirect "/login")))

(defn list-messages
  "Returns json representing upto the last 50 (by reception date) messages
  sent to the user making the request which have the tag specified in the `tag`
  get parameter. Special value `*` will return all messages, regardless of tag."
  [{{{user-id :id} :user} :session {tag "tag"} :params}]
  (json/write-str
    (let [base-query (-> (k/select* e/messages)
                         (k/with e/tags)
                         (k/modifier "DISTINCT")
                         (k/where {:recipient_id user-id})
                         (k/order :recv_date :DESC)
                         (k/limit 50))]
      (if-not (= tag "*")
        (-> base-query
            (k/join e/tags (= :id :tags.users_id))
            (k/where {:tags.name tag})
            (k/exec))
        (k/exec base-query)))))

(defn settings
  [request]
  (selmer/render-file "webmail/templates/settings.html" nil))
