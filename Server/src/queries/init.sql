-- Schema: public

DROP SCHEMA public CASCADE;

CREATE SCHEMA public
  AUTHORIZATION tbgzewneynwwjt;

GRANT ALL ON SCHEMA public TO tbgzewneynwwjt;
GRANT ALL ON SCHEMA public TO public;
COMMENT ON SCHEMA public
  IS 'standard public schema';

CREATE TABLE person (
	id		BIGSERIAL		PRIMARY KEY		NOT NULL,
	nickname	varchar(40)		UNIQUE			NOT NULL,
	pass		varchar(40)					NOT NULL
);

INSERT INTO person (nickname, pass) VALUES ('Bob', 'bob123');
INSERT INTO person (nickname, pass) VALUES ('Jane', 'jane123');
INSERT INTO person (nickname, pass) VALUES ('Andy', 'andy123');
INSERT INTO person (nickname, pass) VALUES ('Zoe', 'zoe123');
INSERT INTO person (nickname, pass) VALUES ('Andrew', 'andrew123');
INSERT INTO person (nickname, pass) VALUES ('Matti', 'matti123');
INSERT INTO person (nickname, pass) VALUES ('Pekka', 'pekka123');
INSERT INTO person (nickname, pass) VALUES ('Saara', 'saara123');

CREATE TABLE block (
	id		BIGSERIAL		PRIMARY KEY		NOT NULL,
	previous_hash	varchar(32)		UNIQUE			NOT NULL,
	hash		varchar(32)		UNIQUE			NOT NULL,
	nonce		BIGINT						NOT NULL,
	body		json
);

INSERT INTO block (previous_hash, hash, nonce, body) VALUES (
	'hash1', 'hash2', 100,
	'{ "from": 2, "to": 3, "amount": 56 }'
);
INSERT INTO block (previous_hash, hash, nonce, body) VALUES (
	'hash2', 'hash3', 200,
	'{ "from": 4, "to": 3, "amount": 18 }'
);
