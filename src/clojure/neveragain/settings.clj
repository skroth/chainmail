(ns neveragain.settings)

(defn rebind-db
  [new-db]
  (def db new-db))

(def db 
  {:classname "org.sqlite.JDBC"
   :subprotocol "sqlite"
   :subname "neveragain.db"})

(def keyfiles {:key "../ssl/client.pkcs8"
               :cert "../ssl/client.crt"
               :ca "../ssl/demoCA/cacert.pem"})

;; The time, in seconds, to wait between rescans of watched files for changes.
;; set to -1 to disable reloading.
(def reload-interval 1)

(def thread-count 1)
(def smtp-port 2500)
(def tls-smtp-port 4650)
(def salt-factor 10)
(def controlled-domains #{"neveraga.in"
                          "lannysport.net"
                          "chainmail.io"})
;; Make sure aes size is lower than ecc size. We don't use any blocking scheme
;; with the public keys so we have to be able to encrypt the aes keys in one block
(def default-ecc-key-size 256)
(def default-aes-key-size 192)
(def banner "
   ___________     ___________     ___________     ___________     ___________
  / _________ \\   / _________ \\   / _________ \\   / _________ \\   / _________ \\
 / /         \\ \\ / /         \\ \\ / /         \\ \\ / /         \\ \\ / /         \\ \\
 | |         | | | |         | | | |         | | | |         | | | |         | |
 | |         | | | |         | | | |         | | | |         | | | |         | |
 | |   C   __| |_| |__  H  __| |_| |__  A  __| |_| |__  I  __| |_| |__  N    | |
 | |      / _| |_| |_ \\   / _| |_| |_ \\   / _| |_| |_ \\   / _| |_| |_ \\      | |
 | |     / / | | | | \\ \\ / / | | | | \\ \\ / / | | | | \\ \\ / / | | | | \\ \\     | |
 \\ \\_____| |_/ / \\  \\| |_| |_/ / \\  \\| |_| |_/ / \\  \\| |_| |_/ / \\  \\| |_____/ /
  \\______| |__/   \\__| |_| |__/   \\__| |_| |__/   \\__| |_| |__/   \\__| |______/
         | |         | | | |         | | | |         | | | |         | |
   ______| |__  M  __| |_| |__  A  __| |_| |__  I  __| |_| |__  L  __| |______
  /  ____| |_ \\   / _| |_| |_ \\   / _| |_| |_ \\   / _| |_| |_ \\   / _| |_____ \\
 /  /    | | \\ \\ / / | | | | \\ \\ / / | | | | \\ \\ / / | | | | \\ \\ / / | |     \\ \\
 | |     \\ \\_| |_| |_/ / \\ \\_| |_| |_/ / \\ \\_| |_| |_/ / \\ \\_| |_| |_/ /     | |
 | |      \\__| |_| |__/   \\__| |_| |__/   \\__| |_| |__/   \\__| |_| |__/      | |
 | |         | | | |         | | | |         | | | |         | | | |         | |
 | |         | | | |         | | | |         | | | |         | | | |         | |
 | |         | | | |         | | | |         | | | |         | | | |         | |
 \\ \\ ________/ / \\ \\_________/ / \\ \\_________/ / \\ \\_________/ / \\ \\_________/ /
  \\___________/   \\___________/   \\___________/   \\___________/   \\___________/")
