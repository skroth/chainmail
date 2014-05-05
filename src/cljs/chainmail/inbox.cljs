(ns inbox)

(def SETTINGS
  {:date-time-format "%a %b %d %I:%M %p",
   :max-line-length 78})

(defn app-view-model []
  (this-as this
           (set! (.-firstName this) (.observable js/ko "Bert"))
           (set! (.-lastName this) (.observable js/ko "Bertington"))
           (set!
             (.-fullName this)
             (.computed js/ko
               (fn []
                 (str (.firstName this) " " (.lastName this))) this))
           (set!
             (.-capitalizeLastName this)
             (fn []
               (.lastName this (-> this .lastName .toUpperCase)))))
  nil
  )
 
(.applyBindings js/ko (app-view-model.))
