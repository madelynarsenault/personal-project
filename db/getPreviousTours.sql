SELECT user.first_name, user.last_name, listing.title, listing.info, listing.id
FROM users
INNER JOIN listing
ON users.id = listing.id
WHERE username = $1;