(use '[clojure.java.jdbc])

(def db {
	:classname "org.sqlite.JDBC"
	:subprotocol "sqlite"
	:subname "neveragain.db"})
