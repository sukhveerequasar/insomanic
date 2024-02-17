
// import React from 'react';
// import Venue from './components/Venue'; // Updated import statement
// import { BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
// // import VenuePage from './components/VenuePage';
// import './components/Custom.css'; 
// // import './styles.css';
// import EventDetails from './components/EventDetails';
// //import Test from './components/Test';
// import Event from './components/Event';
// //import { Link } from 'react-router-dom';
// import VenuePage from './components/VenuePage';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './components/CheckoutForm';
// const stripePromise = loadStripe('pk_test_51OeEfISBso2Dz2oFXsDTdixcoul4HkcrIRrfilFX5c7FKnq5eURTArDEwT4IDctoo6x3DP71KgFiw1VIXyjZaTzV00E5b3S0ij');
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route */}
        
//         {/* <Route path="/" element={<Navigate to="/venue" />} /> */}
//         <Route path="/" element={<Navigate to="/venue" />} />
//         <Route
//           path="/venue"
//           element={<Venue />}
//         />
//         {/* <Route path="/venue/:encodedVenueId" element={<Venue />} /> */}
//         <Route path="/venue/:venueId" element={<Venue />} />
//         {/* <Route path="/venue/:venueId" element={<Venue />} /> */}
//         <Route path="/event/:id" element={<EventDetails />} />
//         <Route path="/event" element={<Event />} />
//         <Route path="/venuepage" element={
//           <Elements stripe={stripePromise}>
//             <VenuePage />
//           </Elements>
//         } />
//         <Route path="/checkout" element={
//           <Elements stripe={stripePromise}>
//             <CheckoutForm />
//           </Elements>
//         } />
       
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './components/Custom.css';
// import EventDetails from './components/EventDetails';
// import Event from './components/Event';
// import Venue from './components/Venue';
// import VenuePage from './components/VenuePage';
// // import { Elements } from '@stripe/react-stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import StripeButton from './components/StripeButton';


// const stripePromise = loadStripe('your_stripe_public_key');

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route */}
//         <Route path="/" element={<Navigate to="/venue" />} />
//         <Route path="/venue" element={<Venue />} />
//         <Route path="/venue/:venueId" element={<Venue />} />
//         <Route path="/event/:id" element={<EventDetails />} />
//         <Route path="/event" element={<Event />} />
//         <Route path="/venuepage" element={<VenuePage />} />
//         <Route
//           path="/checkout"
//           element={
//             <Elements stripe={stripePromise}>
//              <Route
//   path="/checkout"
//   element={
//     <Elements stripe={stripePromise}>
//       <StripeButton />
//     </Elements>
//   }
// />

//             </Elements>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './components/Custom.css';
import EventDetails from './components/EventDetails';
import Event from './components/Event';
import Venue from './components/Venue';
import VenuePage from './components/VenuePage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeButton from './components/StripeButton';
import PaymentForm from './components/PaymentForm';

const stripePromise = loadStripe('pk_test_51OeEfISBso2Dz2oFXsDTdixcoul4HkcrIRrfilFX5c7FKnq5eURTArDEwT4IDctoo6x3DP71KgFiw1VIXyjZaTzV00E5b3S0ij');

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/venue" />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/venue/:venueId" element={<Venue />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/event" element={<Event />} />
        <Route path="/venuepage" element={<VenuePage />} />
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;




