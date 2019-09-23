select users.first_name, users.last_name, listing.title, listing.info
FROM users
INNER JOIN listing
ON user.id = listing.id