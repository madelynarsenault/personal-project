function addTour(req, res) {
    const {postComment, postTitle, url, picture2, picture3 } = req.body;
    const db = req.app.get('db');
    db.getUsernameId(req.session.user.username).then(id => {
        let user_id = id[0].id
        db.addTour(postComment, postTitle, url, picture2, picture3, user_id).then((response) => {
            res.status(200).json(response)
        })
    })
}

function fetchPastTours(req,res){
    const db = req.app.get("db");
    db.fetchPastTours([req.session.user.username]).then(tours => {
        res.status(200).json(tours)
    })
}

function getAllTours(req,res){
    const db = req.app.get('db');

    try {
        db.getTours().then(tours => {
            res.status(200).json(tours);
        })
    } catch (err) {
        console.log("NO WORKING")
    }
}

function editTour(req, res) {
    const {id} = req.params;
    const {title, comment, picture1, picture2, picture3, userId} = req.body;
    console.log(userId, +id)
    const db = req.app.get("db")
    db.updateTour(title, comment, picture1,
         picture2, picture3,
          +id).then(() =>{
        db.getPreviousTours(req.session.user.username).then(tours => {
            res.status(200).json(tours)
        })
    })
    
}

function deletePost (req, res) {
    const {id} = req.params;
    const db = req.app.get('db');
    db.deletePostPurchase(id)
    db.deletePost(id).then(() => {
        console.log(req.session.user.username)
        db.getPreviousTours(req.session.user.username).then(posts => {
            console.log(posts);
            res.status(200).json(posts)
        })
    })
}

module.exports ={
    addTour,
    fetchPastTours,
    getAllTours,
    editTour,
    deletePost
}