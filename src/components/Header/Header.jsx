/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
   *
   * @returns {HTML} HTML markup of the Header
   * @memberof Header
   */
  render() {
    const { user } = this.props;

    return (
      <>
        <header className="Header">
          <div className="Header__logo">
            <Link to="/">
              Authors
              <span className="mustard"> Haven</span>
            </Link>
          </div>

          <TopNav user={user} />
          <SearchForm />
        </header>
        <hr />
      </>
    );
  }
}

Header.defaultProps = {
  user: {},
};

Header.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Header);
