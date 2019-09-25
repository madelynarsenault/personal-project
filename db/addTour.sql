INSERT INTO listing
(info, title, picture1, picture2, picture3, user_id)
VALUES
($1, $2, $3, $4, $5, $6);

SELECT * from listing;
