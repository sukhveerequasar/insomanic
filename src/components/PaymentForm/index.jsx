// PaymentForm.js
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  
    const handlePaymentSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Use elements.getElement to get a reference to the mounted CardElement.
      const cardElement = elements.getElement(CardElement);
  
      // Use confirmCardPayment to handle the payment and confirm the PaymentIntent.
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        console.error(error);
      } else {
        console.log(paymentMethod);
        // Handle the payment success and navigate to a success page.
      }
    };
  
    return (
      <form onSubmit={handlePaymentSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  };

export default PaymentForm;
