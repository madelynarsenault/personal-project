SELECT users.first_name, users.last_name, listing.title, listing.info, listing.id
FROM users
INNER JOIN listing
on users.id = listing.id
WHERE username =$1;