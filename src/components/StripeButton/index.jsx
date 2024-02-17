import React, { useState } from 'react';
import { useStripe, Elements } from '@stripe/react-stripe-js';

const StripeButton = () => {
  const stripe = useStripe();
  const [sessionId, setSessionId] = useState(null);

  const fetchSessionId = async () => {
    try {
      const response = await fetch('YOUR_SERVER_ENDPOINT_TO_CREATE_SESSION', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add any necessary data for your session creation
      });

      if (response.ok) {
        const { sessionId } = await response.json();
        setSessionId(sessionId);
      } else {
        console.error('Failed to fetch session ID');
        // Handle error logic
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      // Handle error logic
    }
  };

  const handleClick = async () => {
    await fetchSessionId();

    if (stripe && sessionId) {
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    }
  };

  return (
    <button onClick={handleClick}>
      Pay with Stripe
    </button>
  );
};

export default StripeButton;
