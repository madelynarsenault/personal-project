function addTour(req, res) {
    const {postComment, postTitle, picture1, picture2, picture3 } = req.body;
    console.log("tc:3")
    const db = req.app.get('db');
    console.log("tc:5", req.session.user)
    db.getUsernameId(req.session.user.username).then(id => {
        let user_id = id[0].id
        console.log(user_id)
        db.addTour(postComment, postTitle, picture1, picture2, picture3, user_id).then((response) => {
            res.status(200).json(response)
        })
    })
}

function fetchPastTours(req,res){
    console.log('tc14:', req.session.user.username)
    const db = req.app.get("db");
    db.fetchPastTours([req.session.user.username]).then(tours => {
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
    db.updateTour(title, info, picture1, picture2, picture3, user_id).then(() =>{
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