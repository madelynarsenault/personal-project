require("dotenv").config()
const express = require("express");
const massive = require('massive');
const session = require('express-session');
const stripe = require("stripe")

const {registerUser, loginUser, logOut} = require("./CONTROLLERS/authController");
const {addTour, fetchPastTours, getAllTours, editTour, deletePost} = require("./CONTROLLERS/tourController");
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
console.log( stripePublicKey, stripeSecretKey);

const app = express();
app.set('view engine', 'ejs')
app.use(express.json());

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Database Connected :D")
})

app.use(session ({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 3
    }
}))

app.post("/auth/register", registerUser)
app.post("/auth/login", loginUser)
app.get("/auth/logout", logOut)
app.get("/auth/user", (req, res) => {
    res.status(200).json(req.session.user);
})
app.post('/api/post', addTour)
app.get('/api/guide/posts', fetchPastTours)
app.get("/api/posts", getAllTours)
app.put("/api/post/:id", editTour)
app.delete("/api/post/:id", deletePost)



app.listen(5050, () => console.log(`listening on port 5050`));