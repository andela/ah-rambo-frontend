import React, { Component } from 'react';
import './Home.scss';
import { setToStorage, getFromStorage, clearFromStorage } from '../../helpers/storageHelper';

/**
 * @class
 */
class Home extends Component {
  /**
   * @name componentDidMount
   * @returns {Null} Null
   */
  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    const params = ['token', 'username'].reduce((acc, value) => {
      acc[value] = queryParams.get(value);
      return acc;
    }, {});
    if (!getFromStorage('token') && params.token) setToStorage(params);
  }

  /**
   * @name render
   * @returns {HTML} HTML DOM elements
   */
  render() {
    return (
      <main className="container">
        <p>
          Welcome to your Home page,
        </p>
        <br />
        <div className="btn">button test</div>
      </main>
    );
  }
}

export default Home;
