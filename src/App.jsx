


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './components/Custom.css';
import EventDetails from './components/EventDetails';
import Event from './components/Event';
import Venue from './components/Venue';
import VenuePage from './components/VenuePage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PastEvent from './components/PastEvent';
// import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';


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
        <Route path="/pastevent" element={<PastEvent />} />
        <Route path="/venuepage" element={<VenuePage />} />
        {/* <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;




