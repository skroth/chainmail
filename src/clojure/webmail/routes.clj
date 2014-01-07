(ns webmail.routes
  (:use compojure.core
    [ring.middleware.params :only [wrap-params]]
    [ring.middleware.keyword-params :only [wrap-keyword-params]]
    [ring.middleware.session :only [wrap-session]])
  (:require (webmail [views :as views])
    [compojure.route :as route]
    [compojure.handler :as handler]
    [compojure.response :as response]))

(defn login-required [func]
  (fn [session]
    (if-not (:user session)
      {:status 403 :body "403: You must be logged in to view this page"}
      (func session))))

(defroutes url-routes
  (GET "/" [] "<h1>Hello World!</h1>")
  (GET "/login" {session :session} (if (:authenticated session) "HEY DUDE!!" "NOT HEY!"))
  (POST "/login" {params :params session :session} (views/login params session))
  (GET "/messages" {session :session} ((login-required views/list-messages) session))
  (route/resources "/css" {:root "webmail/css"})
  (route/resources "/js" {:root "webmail/js"})
  (route/resources "/img" {:root "webmail/img"})
  (route/resources "/" {:root "webmail/html"})
  (route/not-found "<h1>Page not found</h1>"))

(def app
  (-> #'url-routes wrap-session wrap-params wrap-keyword-params))