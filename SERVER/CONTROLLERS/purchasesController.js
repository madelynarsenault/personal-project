function addPurchasedTour(req,res){
    const {listing_id} = req.body;
    const {id} = req.session.user
    console.log(id)
    console.log('pc3:', req.body);
    const db = req.app.get('db');
    db.addPurchase(id, listing_id).then((response) => {
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