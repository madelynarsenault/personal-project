select users.first_name, users.last_name, listing.id, listing.title, listing.info, listing.picture1, listing.picture2, listing.picture3
FROM users
INNER JOIN listing
ON users.id = listing.user_id