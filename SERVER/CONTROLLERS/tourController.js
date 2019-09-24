function addTour(req, res) {
    const {postComment, postTitle, picture1, picture2, picture3} = req.body;
    const db = req.app.get('db');
    console.log(req.session.user)
    db.getUsernameId(req.session.user.username).then(id => {
        let userID = id[0].id
        db.addTour(postComment, postTitle, picture1, picture2, picture3).then((response) => {
            res.sendStatus(200).json(response)
        })
    })
}

function fetchPastTours(req,res){
    const db = req.app.get("db");
    db.fetchPastTours(req.session.user.username).then(tours => {
        console.log('tc16:', tours)
        res.status(200).json(tours)
    })
}

function getAllTours(req,res){
    const db = req.app.get('db');
    db.getTours().then(tours => {
        res.status(200).json(tours);
    })
}

function editTour(req, res) {
    const {id} = req.params;
    const {title, info} = req.body;
    const db = req.app.get("db")
    db.updateTour(title, info, id).then(() =>{
        db.getPreviousTours(req.session.user.username).then(tours => {
            res.status(200).json(tours)
        })
    })
    
}

module.exports ={
    addTour,
    fetchPastTours,
    getAllTours,
    editTour
}