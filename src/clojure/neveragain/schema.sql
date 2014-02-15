CREATE TABLE users
( id INTEGER PRIMARY KEY,
  realname TEXT,
  address TEXT,
  hostname TEXT,
  elgamal_pub_key TEXT,
  hashword TEXT,
  max_smtp_line_length INTEGER DEFAULT 78,
  accept_non_ssl_conns INTEGER DEFAULT 1,
  UNIQUE (address, hostname) ON CONFLICT ROLLBACK);

CREATE TABLE forwarding_directives
( id INTEGER PRIMARY KEY,
  destination_address TEXT,
  owner_id INTEGER,
  FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE);

CREATE TABLE tags
( id INTEGER PRIMARY KEY,
  name TEXT,
  owner_id INTEGER,
  message_id INTEGER,
  FOREIGN KEY(message_id) REFERENCES messages(id) ON DELETE CASCADE,
  FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE);

CREATE TABLE messages
( id INTEGER PRIMARY KEY,
  data TEXT,
  recv_date INTEGER,
  recipient_id INTEGER,
  aes_key TEXT,
  pub_key TEXT,
  iv TEXT,
  FOREIGN KEY(recipient_id) REFERENCES users(id));
