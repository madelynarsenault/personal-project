SELECT users.first_name, users.last_name, listing.title, listing.info, listing.id, listing.picture1, listing.picture2, listing.picture3
FROM users
INNER JOIN listing
on users.id = listing.user_id
WHERE username =$1;