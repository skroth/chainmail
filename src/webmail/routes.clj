(ns webmail.routes
  (:use compojure.core)
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [compojure.response :as response]))

(defroutes app
  (GET "/" [] "<h1>Hello World!</h1>")
  (route/resources "/css" {:root "webmail/css"})
  (route/resources "/js" {:root "webmail/js"})
  (route/resources "/img" {:root "webmail/img"})
  (route/resources "/" {:root "webmail/html"})
  (route/not-found "<h1>Page not found</h1>"))
