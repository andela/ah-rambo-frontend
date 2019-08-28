import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

/**
 *
 * @desc App component
 *
 * @returns {function} jsx
 */
const App = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

export default App;
