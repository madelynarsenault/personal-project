INSERT INTO users
(first_name, last_name, email, is_guide, username, password)
VALUES
($1, $2, $3, $4, $5, $6)
returning *;