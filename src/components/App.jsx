import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Footer from './Footer/Footer';

/**
 *
 * @desc App component
 *
 * @returns {function} jsx
 */
const App = () => (
  <BrowserRouter>
    <Router />
    <Footer />
  </BrowserRouter>
);

export default App;
