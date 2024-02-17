// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import PaymentForm from '../../components/PaymentForm';


// const stripePromise = loadStripe('your_test_publishable_key');

// const PaymentPopup = () => {
//   const [clientSecret, setClientSecret] = useState(null);

//   const handlePayment = async (token) => {
//     // Send the token to your Laravel backend to process the payment
//     const response = await fetch('/api/payment-intent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: 1000 }), // Replace with the actual amount
//     });

//     const { clientSecret: newClientSecret } = await response.json();
//     setClientSecret(newClientSecret);

//     // Use the new client secret to confirm the payment on the frontend
//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: 'John Doe', // Replace with the actual name
//         },
//       },
//     });

//     if (result.error) {
//       console.error(result.error);
//     } else {
//       // Payment successful
//       console.log(result.paymentIntent);
//     }
//   };

//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm handlePayment={handlePayment} />
//     </Elements>
//   );
// };

// export default PaymentPopup;
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentPopup = ({ stripePromise }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      console.error('Stripe.js has not loaded yet.');
      return;
    }

    const { token, error } = await stripe.createToken(elements.getElement(CardElement));

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

   
    console.log('Token:', token);

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Make Payment'}
      </button>
    </form>
  );
};

export default PaymentPopup;
