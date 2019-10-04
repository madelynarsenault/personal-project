SELECT *
FROM purchases
INNER JOIN users
ON users.id = purchases.user_id
INNER JOIN listing
ON purchases.listing_id = listing.id
WHERE users.id = $1
