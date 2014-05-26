CREATE TABLE users
( id INTEGER PRIMARY KEY,
  realname TEXT,
  address TEXT,  -- normalized, must be unique with hostname, what we show 
                 -- to users and stick on outbound email
  box_name TEXT, -- A local part of an address that must normalize to the 
                 --`address` in the same row
  hostname TEXT,
  elgamal_pub_key TEXT,
  hashword TEXT,
  max_smtp_line_length INTEGER DEFAULT 78,
  accept_non_ssl_conns INTEGER DEFAULT 1,
  next_seq_num INTEGER DEFAULT 1,
  UNIQUE (address, hostname) ON CONFLICT ROLLBACK);

CREATE TABLE forwarding_directives
( id INTEGER PRIMARY KEY,
  destination_address TEXT,
  owner_id INTEGER,
  FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE);

CREATE TABLE platonic_tags
( id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id INTEGER NOT NULL,
  FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(name, owner_id) ON CONFLICT IGNORE);

CREATE TABLE tags
( id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id INTEGER NOT NULL,
  message_id INTEGER NOT NULL,
  FOREIGN KEY(message_id) REFERENCES messages(id) ON DELETE CASCADE,
  FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(name, message_id) ON CONFLICT REPLACE);

CREATE TABLE messages
( id INTEGER PRIMARY KEY,
  data TEXT NOT NULL,
  recv_date INTEGER NOT NULL,
  recipient_id INTEGER NOT NULL,
  aes_key TEXT NOT NULL,
  pub_key TEXT NOT NULL,
  iv TEXT NOT NULL,
  seq_num INTEGER,
  FOREIGN KEY(recipient_id) REFERENCES users(id));

-- All new messages are recent, insert the proper records in the tags table 
-- on message creation.
CREATE TRIGGER add_tags AFTER INSERT ON messages
  BEGIN
    INSERT INTO tags
      (name, owner_id, message_id) VALUES
      ("\Recent", new.recipient_id, new.id);
    INSERT INTO tags
      (name, owner_id, message_id) VALUES
      ("\Inbox", new.recipient_id, new.id);
  END;

CREATE TRIGGER add_platonic_tags AFTER INSERT ON tags
  BEGIN
    INSERT INTO platonic_tags
      (name, owner_id) VALUES
      (new.name, new.owner_id);
  END;

-- A reasonable approximation of an auto increment counter per-mailbox
CREATE TRIGGER set_seq_num AFTER INSERT ON messages
  BEGIN
    UPDATE messages SET 
      seq_num =
        (SELECT next_seq_num FROM users WHERE users.id = new.recipient_id)
      WHERE messages.id = new.id;

    UPDATE users SET next_seq_num = next_seq_num + 1;
  END;

-- When messages get deleted we want to prevent gaps in the seq numbers so 
-- every message after the deleted one gets its seq num bumped down.
CREATE TRIGGER dec_seq_nums AFTER DELETE ON messages
  BEGIN
    UPDATE users 
      SET next_seq_num = next_seq_num - 1
      WHERE id = old.recipient_id;

    UPDATE messages 
      SET seq_num = seq_num - 1
      WHERE
        recipient_id = old.recipient_id AND
	seq_num > old.seq_num;
  END;
