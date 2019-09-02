import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './TopNav.scss';
import { clearFromStorage } from '../../helpers/storageHelper';

const TopNav = ({ user, isAuthenticated, deAuthUser }) => (
  <nav className="Header__nav">
    <ul className="Header__nav__list">
      {Object.keys(user).length && isAuthenticated ? (
        <>
          <li className="Header__nav__item user">
            <Link to="/profile">
              <img src={user.avatarUrl} alt="User Avatar" />
            </Link>
          </li>
          <li className="Header__nav__item logout">
            <Link to="/login"><span onClick={() => { deAuthUser(); clearFromStorage(); }}>Logout</span></Link>
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
  user: PropTypes.object,
  deAuthUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


TopNav.defaultProps = {
  user: {}
};


export default TopNav;
