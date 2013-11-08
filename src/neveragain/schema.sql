CREATE TABLE users 
(	id INTEGER PRIMARY KEY,
	realname TEXT,
	address TEXT,
	hostname TEXT,
	UNIQUE (address, hostname) ON CONFLICT ROLLBACK);

CREATE TABLE tags 
(	id INTEGER PRIMARY KEY,
	name TEXT,
	message_id INTEGER,
	FOREIGN KEY(message_id) REFERENCES messages(id) ON DELETE CASCADE);

CREATE TABLE messages 
(	id INTEGER PRIMARY KEY,
	to_info TEXT,
	subject TEXT,
	body TEXT,
	recepient_id INTEGER,
	FOREIGN KEY(recepient_id) REFERENCES users(id));