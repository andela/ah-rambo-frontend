/* eslint-disable require-jsdoc */
import React, { Component } from 'react';

class Profile extends Component {
  state = {
    username: null,
  };

  componentDidMount() {
    try {
      const username = localStorage.getItem('username');
      this.setState({ username });
    } catch (error) {}
  }

  render() {
    return (
      <p>
        Welcome to profile page, &nbsp;
        {this.state.username}
      </p>
    );
  }
}

export default Profile;
