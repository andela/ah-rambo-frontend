import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchStartRequest } from '../../actions/search/search';
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
   * @returns {null} routes to the search route
   * @memberof Header
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const mydata = data.get('SearchForm');
    this.props.searchStartRequest(mydata);
    this.props.history.push('/search');
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

        <TopNav user={user} />
        <SearchForm
          handleSubmit={this.handleSubmit}
        />
      </header>
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
  search: state.search
});

export default connect(
  mapStateToProps,
  { searchStartRequest }
)(withRouter(Header));
