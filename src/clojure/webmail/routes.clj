(ns webmail.routes
  (:use compojure.core
    [ring.middleware reload]
    [ring.middleware.params :only [wrap-params]]
    [ring.middleware.keyword-params :only [wrap-keyword-params]]
    [ring.middleware.session :only [wrap-session]])
  (:require (webmail [views :as views])
    [selmer.parser :as selmer]
    [compojure.route :as route]
    [compojure.handler :as handler]
    [compojure.response :as response]))

(defn login-required [func]
  (fn [request]
    (if-not (:user (:session request))
      {:status 403 :body "403: You must be logged in to view this page"}
      (func request))))

(defn direct-to-template [template-name]
  (fn [request]
    (selmer/render-file (str "webmail/templates/" template-name) (:session request))))

(defroutes url-routes
  (GET "/" [request] views/index)
  (GET "/login" [request] (direct-to-template "login.html"))
  (POST "/login" [request] views/login)
  (GET "/messages" [request] (login-required views/list-messages))
  (GET "/inbox" [] (login-required (direct-to-template "inbox.html")))
  (GET "/new-key" [request] (login-required views/make-key))
  (route/resources "/css" {:root "webmail/css"})
  (route/resources "/js" {:root "webmail/js"})
  (route/resources "/img" {:root "webmail/img"})
  (route/not-found "<h1>Page not found</h1>"))

(def app
  (-> #'url-routes 
    (wrap-reload '(views))
    wrap-session 
    wrap-params 
    wrap-keyword-params))
