CREATE TABLE users 
(  id INTEGER PRIMARY KEY,
  realname TEXT,
  address TEXT,
  hostname TEXT,
  elgamal_pub_key TEXT,
  hashword TEXT,
  UNIQUE (address, hostname) ON CONFLICT ROLLBACK);

CREATE TABLE tags 
(  id INTEGER PRIMARY KEY,
  name TEXT,
  owner_id INTEGER,
  message_id INTEGER,
  FOREIGN KEY(message_id) REFERENCES messages(id) ON DELETE CASCADE,
  FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE);

CREATE TABLE messages 
(  id INTEGER PRIMARY KEY,
  data TEXT,
  recv_date INTEGER,
  recipient_id INTEGER,
  aes_key TEXT,
  public_key TEXT,
  iv TEXT,
  FOREIGN KEY(recipient_id) REFERENCES users(id));