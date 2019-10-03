require("dotenv").config()
const express = require("express");
const massive = require('massive');
const session = require('express-session');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecretKey);
const uuid = require('uuid/v4')
var cors = require('cors')

const {registerUser, loginUser, logOut} = require("./CONTROLLERS/authController");
const {addTour, fetchPastTours, getAllTours, editTour, deletePost} = require("./CONTROLLERS/tourController");
const {addPurchasedTour} = require('./CONTROLLERS/purchasesController');
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY


const app = express();
app.set('view engine', 'ejs')
app.use(express.json());
app.use(cors());

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



app.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);
  
    let error;
    let status;
    try {
      const { product, token } = req.body;
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
  
      const idempotency_key = uuid();
      const charge = await stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
          idempotency_key
        }
      );
      console.log("Charge:", { charge });
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
  
    res.json({ error, status });
  });




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
app.post('/api/purchased', addPurchasedTour)



app.listen(5050, () => console.log(`listening on port 5050`));