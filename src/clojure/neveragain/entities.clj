(ns neveragain.entities
  (:require
    (korma [db :refer :all]
           [core :refer :all])
    (clojure [string :as string])
    (neveragain [settings :as settings])))

(defdb korma-db settings/db)
(declare users forwarding_directives platonic_tags tags)

(defentity users
  (database korma-db)
  (has-many platonic_tags))

(defentity forwarding_directives
  (database korma-db)
  (belongs-to users (:fk :owner_id)))

(defentity platonic_tags
  (database korma-db)
  (belongs-to users))

(defentity tags
  (database korma-db)
  (belongs-to users))

(defentity messages
  (belongs-to users {:fk :recipient_id})
  (has-many tags {:fk :message_id}))

;(insert tags
;  (values {:users_id 1
;           :message_id 1
;           :name "MB-Newsletters"}))

(-> (select* messages)
    (join tags (= :id :tags.users_id))
    (modifier "DISTINCT")
    (where {:recipient_id 1})
    (where {:tags.name "MB-Newsletters"})
    (order :recv_date :DESC)
    (limit 50)
    (exec))
