function addPurchasedTour(req,res){
    const db = req.app.get('db');
    db.addPurchase(user_id, listing_id).then((response) => {
        res.status(200).json(response)
    })
}

module.exports = {
    addPurchasedTour
}