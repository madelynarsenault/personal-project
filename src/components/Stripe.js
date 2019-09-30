import React from 'react';
import ReactDOM from 'react-dom';
import StripeCheckout from 'react-stripe-checkout';


function Stripe(){
    const [product] = React.useState({
        name: "Tokyo Tours",
        price: 123.76
    });

   function handleToken (token, addresses){
        console.log({token, addresses})
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