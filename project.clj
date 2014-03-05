(defproject neveragain "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [
    [org.clojure/clojure "1.5.1"]
    [swiss-arrows "1.0.0"]
    [org.clojure/java.jdbc "0.3.2"]
    [org.clojure/data.codec "0.1.0"]
    [org.clojure/data.json "0.2.3"]
    [org.xerial/sqlite-jdbc "3.7.2"]
    [org.mindrot/jbcrypt "0.3m"]
    [bouncycastle/bcprov-jdk16 "140"]
    [compojure "1.1.6"]
    [selmer "0.5.7"]]
  :plugins [[lein-ring "0.7.1"]]
  :main ^:skip-aot neveragain.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}}
  :source-paths ["src/clojure"]
  :java-source-paths ["src/java"]
  :ring {:handler webmail.routes/app})
