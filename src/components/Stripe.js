import React from 'react';
import ReactDOM from 'react-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {toast} from 'react-toastify';
import {connect} from 'react-redux';
import {updateUser} from "../redux/userReducer"

toast.configure()

function Stripe(props){
    console.log(props.user.id, props.listing_id)
    const [product] = React.useState({
        name: "Tokyo Tours",
        price: 123.76
    });
    async function orderTour(){
        const {listing_id} = props
        axios.post('/api/purchased', {user_id: props.user.id, listing_id})
    }
   async function handleToken (token, addresses){
        // console.log({token, addresses})
      const response = await axios.post("/api/checkout", {
            token,
            product
        })
        const { status } = response.data
        if (status === "success") {
            console.log('hit on Stripe')
            toast('Success! Check your email for details on your tour',
            { type: 'success' })
            // post sending listing_id and user_id to db
            orderTour()
        } else {
            toast('Something went wrong, please check your credit card number',
            {type: 'error'})
        }
    }
    return(
        <StripeCheckout
            stripeKey="pk_test_c0sl7Djy53INcIUsidMLNTSD00TGAbhMKU"
            token={handleToken}
            billingAddress
            amount={product.price * 100}
            name={product.name}

             />
       
    )
}
function mapStateToProps(reduxState){
    console.log(reduxState)
    return{
        user:reduxState.user
    }
}


export default connect(mapStateToProps,{
    updateUser
})(Stripe);