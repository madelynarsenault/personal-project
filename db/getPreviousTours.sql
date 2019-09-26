SELECT users.first_name, users.last_name, listing.title, listing.info, listing.id
FROM users
INNER JOIN listing
ON users.id = listing.user_id
WHERE username = $1;