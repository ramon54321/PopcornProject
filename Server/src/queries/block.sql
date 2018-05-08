SELECT * FROM block;
SELECT * FROM block WHERE id = 2;
SELECT * FROM block WHERE hash = 'hash2';
SELECT * FROM block WHERE previous_hash = 'hash2';
SELECT * FROM block WHERE body ->> 'from' = 'Jane';
SELECT * FROM block WHERE body ->> 'to' = 'Andy';