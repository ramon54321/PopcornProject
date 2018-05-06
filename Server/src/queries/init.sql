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
	pass		varchar(40)					NOT NULL,
    type        varchar(40)                 NOT NULL
);

INSERT INTO person (nickname, pass, type) VALUES ('HelsinkiBank', 'helsinkibank123', 'bank');
INSERT INTO person (nickname, pass, type) VALUES ('CoffeeShop', 'coffeeshop123', 'store');
INSERT INTO person (nickname, pass, type) VALUES ('DonutShop', 'donutshop123', 'store');
INSERT INTO person (nickname, pass, type) VALUES ('Bob', 'bob123', 'customer');
INSERT INTO person (nickname, pass, type) VALUES ('Jane', 'jane123', 'customer');
INSERT INTO person (nickname, pass, type) VALUES ('Andy', 'andy123', 'customer');
INSERT INTO person (nickname, pass, type) VALUES ('Zoe', 'zoe123', 'customer');
INSERT INTO person (nickname, pass, type) VALUES ('Andrew', 'andrew123', 'customer');
INSERT INTO person (nickname, pass, type) VALUES ('Matti', 'matti123', 'customer');
INSERT INTO person (nickname, pass, type) VALUES ('Pekka', 'pekka123', 'customer');
INSERT INTO person (nickname, pass, type) VALUES ('Saara', 'saara123', 'customer');

CREATE TABLE block (
	id		BIGSERIAL		PRIMARY KEY		NOT NULL,
	previous_hash	varchar(64)		UNIQUE			NOT NULL,
    body        json,
	nonce		BIGINT						NOT NULL,
    hash		varchar(64)		UNIQUE			NOT NULL
);

INSERT INTO block (previous_hash, body, nonce, hash) VALUES (
	'hash1',
    '{ "from": 0, "to": 1, "amount": 100 }',
    100,
    'hash2'
);

INSERT INTO block (previous_hash, body, nonce, hash) VALUES (
	'hash2',
    '{ "from": 1, "to": 2, "amount": 20 }',
    100,
    'hash3'
);

INSERT INTO block (previous_hash, body, nonce, hash) VALUES (
	'hash3',
    '{ "from": 1, "to": 3, "amount": 40}',
    200,
    'hash4'
);

INSERT INTO block (previous_hash, body, nonce, hash) VALUES (
	'hash4',
    '{ "from": 2, "to": 4, "amount": 2}',
    200,
    'hash5'
);

INSERT INTO block (previous_hash, body, nonce, hash) VALUES (
	'hash5',
    '{ "from": 3, "to": 5, "amount": 1}',
    200,
    'hash6'
);
