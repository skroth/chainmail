(ns webmail.views
  (:use compojure.core
    ring.util.response)
  (:require
    (neveragain [common :refer :all]
                [settings :as settings]
                [addresses :as addresses])
    (clojure.java [jdbc :refer :all])
    (clojure.data [json :as json])
    (clojure.data.codec [base64 :as b64])
    [clojure.string :as string]
    [selmer.parser :as selmer])
  (:import
    (org.mindrot.jbcrypt BCrypt)))

(def tagged-messages-sql "
  SELECT messages.*, tags.id AS tag_id FROM tags
  INNER JOIN messages
    ON messages.id=tags.message_id
  WHERE
    tags.name=? AND
    tags.owner_id=?
  ORDER BY messages.recv_date
  LIMIT 50")

(def all-messages-sql "
  SELECT * FROM messages
  WHERE recipient_id=?
  ORDER BY messages.recv_date
  LIMIT 50")

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
  ([request]
    (make-key request settings/db))
  ([{{user :user} :session} db]
    "Generate a new elGamal key pair, store the public material in the database
    and send the private key to the user."
    (let [key-pair (gen-key-pair)
        pub-key (.getPublic key-pair)
        priv-key (.getPrivate key-pair)]
      (update! db
               :users
               {:elgamal_pub_key (serialize-pub-key pub-key)}
               ["id = ?" (:id user)])
      (json/write-str
        (reduce
          ; b64 encode the 4 BigIntegers that make up the keypair
          (fn [m [key val]]
            (assoc m key (apply str (map char (b64/encode (.toByteArray val))))))
          {}
          {:p (.getP (.getParams pub-key))
           :g (.getG (.getParams pub-key))
           :y (.getY pub-key)
           :x (.getX priv-key)})))))

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
  ([request]
    (orient request settings/db))
  ([request db]
    "Returns a JSON object letting a web-client user know some things about
    themself, including what we think their address is and the current state of
    their settings in our db"
    (let [user (first (query db ["SELECT * FROM users WHERE id=? LIMIT 1"
          (:id (:user (:session request)))]))]
      (json/write-str {
        :address (str (:address user) "@" (:hostname user))
        :realname (:realname user)
      }))))

(defn remove-tag
  ([request]
    (remove-tag request settings/db))
  ([{{{user-id :id} :user} :session {tags "tags"} :query-params} db]
    "Deletes a set of tags with ids specified in the `tags` get param iff all are
    owned by the user making the request."
    (if-not tags
      {:status 422
       :body "Hark! Thy request is deficient in its `tags`." }

      (let [tag-ids (string/split tags #",")
          owners (query db (concat
            [(str
              "SELECT owner_id FROM tags WHERE id in "
              (gen-set-placeholders tag-ids))]
            tag-ids))]

        (cond
          (> (count tag-ids) 50)
            {:status 422
             :body "Hark! Thy askth too much, milord! I can not delete so many!" }

          (not (= (count owners) (count tag-ids)))
            {:status 422
             :body "Hark! One or more of the tags thou asked for art delequent!" }

          (not (every? (partial = user-id) (map :owner_id owners)))
            {:status 403
             :body "Hark! One or more of these is not thy tag to delete! Begone knave!" }

          :else (do
            (execute! db (concat
              [(str "DELETE FROM tags WHERE id in "
                (gen-set-placeholders tag-ids))]
              tag-ids))
            {:status 200 :body "Hail! Thy quest succeedeth!"}))))))

(defn register
  ([request]
    (register message settings/db))
  ([{{:strs [local-part domain full-name password]} :params} db]
   (let [proposed-address (str address "@" domain)])
    (json/write-str
     (cond
      (not (contains? settings/controlled-domains domain))
       {:status "failure"
        :reason "Hark! We don't hand out addresses on that domain!"}
      (not (:valid (addresses/parse-addr-spec proposed-address)))
       {:status "failure"
        :reason "Hark! Thou hath failed to specify a valid address!"}
      (has-account-here proposed-address db)
       {:status "failure"
        :reason "Hark! Some knave hath heretofore snatched thine address!"}
      :else
       (let [key-pair (gen-key-pair)
             pub-key (.getPublic key-pair)
             priv-key (.getPrivate key-pair)]
        (do (insert! db :users {:realname full-name
                                :address address
                                :hostname domain
                                :hashword (hash-pass password)
                                :elgamal_pub_key (serialize-pub-key pub-key)})
           {:status "success"}))


    )
   nil))

(defn index [request]
 (if (:user (:session request))
  (make-redirect "/inbox")
  (make-redirect "/login")))

(defn list-messages
  ([request]
    (list-messages request settings/db))
  ([{{{user-id :id} :user} :session {tag "tag"} :params} db]
    "Returns json representing upto the last 50 (by reception date) messages
    sent to the user making the request which have the tag specified in the `tag`
    get parameter. Special value `*` will return all messages, regardless of tag."
    (if (= tag "*")
      (json/write-str (query db [all-messages-sql user-id]))
      (json/write-str (query db [tagged-messages-sql tag user-id])))))

(defn settings
  ([request]
    (settings request settings/db))
  ([request db]
    (selmer/render-file "webmail/templates/settings.html" nil)))
