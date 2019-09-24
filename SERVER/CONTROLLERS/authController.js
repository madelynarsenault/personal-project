const bcrypt = require ("bcrypt");

module.exports ={
    registerUser: function (req, res){
        const {username, password, email, firstName, lastName, isGuide} = req.body
        console.log(username)
        const db = req.app.get("db");
        
        db.checkForTakenUsernameOrEmail(username, email).then(count => {
            if(+count[0].count === 0) {
                const salt = bcrypt.genSaltSync(12)
                bcrypt.hash(password, salt).then(hash => {
                    db.registerUsers(firstName, lastName, email, isGuide, username, hash).then(() => {
                        req.session.user ={
                            username,
                            firstName,
                            lastName,
                            email,
                            isGuide
                        }
                        res.status(200).json(req.session.user);
                    })
                })
            } else {
                res.status(409).json({
                    error: "The username or email already exists with Tokyo Tours. Please log in with your account"
                })
            }
        })
    },
    loginUser: function (req, res) {
        const {username, password} = req.body;
        const db = req.app.get("db");
        db.getPassword(username).then(user => {
            let hash = user[0].password;
            bcrypt.compare(password, hash).then(areSame => {
                if(areSame){
                    req.session.user ={
                        username,
                        firstName: user[0].first_name,
                        lastName: user[0].last_name,
                        email: user[0].email,
                        isGuide: user[0].is_guide,
                        id: user[0].user_id
                        
                    }
                    res.status(200).json(req.session.user);
                } else {
                    res.status(401).json({
                        error: "The username or password you entered is incorrect"
                    })
                }
            })
        })
    }
}