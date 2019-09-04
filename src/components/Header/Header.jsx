import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getUserProfile from '../../actions/user/getUserProfile';
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
  componentDidMount() {
    this.props.getUserProfile();
  }

  /**
   *
   *
   * @returns {HTML} HTML markup of the Header
   * @memberof Header
   */
  render() {
    const { user } = this.props;

    return (
      <header className="Header">
        <div className="Header__logo">
          <Link to="/">
            Authors
            <span className="mustard"> Haven</span>
          </Link>
        </div>

        <TopNav user={user || {}} />
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
  getUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(Header);
