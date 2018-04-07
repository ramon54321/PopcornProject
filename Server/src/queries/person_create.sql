INSERT INTO person (nickname, pass) VALUES
($1, $2) RETURNING *;
