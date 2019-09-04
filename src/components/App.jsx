import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
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
  </BrowserRouter>
);

export default App;
