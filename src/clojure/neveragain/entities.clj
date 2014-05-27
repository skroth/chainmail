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
  (has-many tags))

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
  (belongs-to users {:fk :recipient_id}))
