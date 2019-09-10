import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './TopNav.scss';

const TopNav = ({ user }) => (
  <nav className="Header__nav">
    <ul className="Header__nav__list">
      {Object.keys(user).length ? (
        <>
          <li className="Header__nav__item user">
            <Link to="/profile">
              <img src={user.avatarUrl} alt="User Avatar" />
            </Link>
          </li>
          <li className="Header__nav__item logout">
            <Link to="/login">Logout</Link>
          </li>
        </>
      ) : (
        <>
          <li className="Header__nav__item signup">
            <Link to="/signup">Sign up</Link>
          </li>
          <li className="Header__nav__item login">
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </ul>
  </nav>
);

TopNav.propTypes = {
  user: PropTypes.object.isRequired,
};

export default TopNav;
