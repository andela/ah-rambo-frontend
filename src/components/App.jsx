import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Footer from './Footer/Footer';
import Header from './Header/Header';

/**
 *
 * @desc App component
 *
 * @returns {function} jsx
 */
const App = () => (
  <BrowserRouter>
    <Header />
    <Router />
    <Footer />
  </BrowserRouter>
);

export default App;
