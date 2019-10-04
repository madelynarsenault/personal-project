function addPurchasedTour(req,res){
    const {user_id, listing_id} = req.body;
    console.log('pc3:', req.body);
    const db = req.app.get('db');
    db.addPurchase(user_id, listing_id).then((response) => {
        res.status(200).json(response)
    })
}

function getPurchasedTour(req, res){
    const db = req.app.get('db');
    db.getPurchasedTour([req.session.user.id]).then(tours =>{
        res.status(200).json(tours)
    })
}


module.exports = {
    addPurchasedTour,
    getPurchasedTour
}