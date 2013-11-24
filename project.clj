(defproject neveragain "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [
  	[org.clojure/clojure "1.5.1"] 
  	[org.clojure/java.jdbc "0.0.6"]
    [org.clojure/data.codec "0.1.0"]
  	[org.xerial/sqlite-jdbc "3.7.2"]
    [org.mindrot/jbcrypt "0.3m"]
    [compojure "1.1.6"]]
  :plugins [[lein-ring "0.7.1"]]
  :main ^:skip-aot neveragain.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}}
  :ring {:handler webmail.routes/app})
