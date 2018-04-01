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
	previous_hash	varchar(64)		UNIQUE			NOT NULL,
    body        json,
	nonce		BIGINT						NOT NULL,
    hash		varchar(64)		UNIQUE			NOT NULL
);

INSERT INTO block (previous_hash, body, nonce, hash) VALUES (
	'hash1',
    '{ "from": 2, "to": 3, "amount": 56 }',
    100,
    'hash2'
);
INSERT INTO block (previous_hash, body, nonce, hash) VALUES (
	'hash2',
    '{ "from": 4, "to": 3, "amount": 18 }',
    200,
    'hash3'
);
