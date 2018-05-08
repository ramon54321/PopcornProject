INSERT INTO person (nickname, pass, type) VALUES
($1, $2, $3) RETURNING *;
