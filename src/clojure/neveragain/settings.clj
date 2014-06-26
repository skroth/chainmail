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

;; Size of thread pool for SMTP server
(def thread-count 1)

(def smtp-port 2500)
(def tls-smtp-port 4650)

;; For passwords. Higher numbers means larger salt means more security means
;; longer authentication times.
(def salt-factor 10)
(def controlled-domains #{"neveraga.in"
                          "lannysport.net"
                          "chainmail.io"})

;; Number of milliseconds with no activity before we close a smtp session
(def smtp-session-timeout (* 60 1000))

;; The number of failed login attempts a client can make before we start 
;; imposing rate limiting
(def repeated-login-grace 3)

;; The amount of lockout time, in seconds, for the first failed login attempt 
;; beyond the grace number. Lockout time is base^(failures - grace) seconds.
(def base-auth-timeout 2)

;; The maximum number of live connections a single IP address can have with
;; the smtp server at one time.
(def smtp-simultaneous-connections 1)

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
