import React from 'react';
import ReactDOM from 'react-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {toast} from 'react-toastify';

toast.configure()

function Stripe(){
    const [product] = React.useState({
        name: "Tokyo Tours",
        price: 123.76
    });

   async function handleToken (token, addresses){
        // console.log({token, addresses})
      const response = await axios.post("/checkout", {
            token,
            product
        })
        const { status } = response.data
        if (status === "success") {
            toast('Success! Check your email for details on your tour',
            { type: 'success' })
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


export default Stripe;