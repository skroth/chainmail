(ns neveragain.settings)

(def db {
	:classname "org.sqlite.JDBC"
	:subprotocol "sqlite"
	:subname "neveragain.db"})

(def thread-count 2)
(def smtp-port 2500)
(def salt-factor 10)
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
