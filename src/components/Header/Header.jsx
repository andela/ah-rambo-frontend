import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getUserDetails from '../../actions/user/getUserDetails';
import { deAuthUser } from '../../actions/auth';
import SearchForm from '../SearchForm/SearchForm';
import TopNav from '../TopNav/TopNav';
import './Header.scss';

/**
 *
 *
 * @export
 * @class Header
 * @extends {Component}
 */
export class Header extends Component {
  
  /**
   *
   * @returns {object} Authenticated user profile object
   * @memberof Header
   */
  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.props.getUserDetails();
    }
  }

  /**
   *
   *
   * @returns {HTML} HTML markup of the Header
   * @memberof Header
   */
  render() {
    const { user, isAuthenticated } = this.props;
    return (
      <header className="Header">
        <div className="Header__logo">
          <Link to="/">
            Authors
            <span className="mustard"> Haven</span>
          </Link>
        </div>
        <TopNav
          user={user}
          isAuthenticated={isAuthenticated}
          deAuthUser={this.props.deAuthUser}
        />
        <SearchForm />
      </header>
    );
  }
}

Header.defaultProps = {
  user: {},
};

Header.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  getUserDetails: PropTypes.func.isRequired,
  deAuthUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user.userData,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getUserDetails, deAuthUser }
)(Header);
