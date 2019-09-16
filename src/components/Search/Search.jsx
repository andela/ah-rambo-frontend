import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SearchNav from '../SearchNav/SearchNav';
import ArticleSearch from '../ArticleSearch/ArticleSearch';
import Spinner from '../Spinner/spinner';

import {
  searchRequest,
  searchStartRequest,
  searchArticleRequest
} from '../../actions/search/search';
import './Search.scss';

/**
 *
 *
 * @export
 * @class Search
 * @extends {Component}
 */
export class Search extends Component {
  state = { searchLoading: false };

  /**
   *
   *
   * @returns {bool} boolean value of the Search Loading
   * @memberof Search
   */
  static getDerivedStateFromProps(props, state) {
    if (props.searchLoading !== state.searchLoading) {
      return {
        searchLoading: props.searchLoading,
      };
    }
    return null;
  }

  /**
   *
   *
   * @returns {HTML} HTML markup of the Search
   * @memberof Search
   */
  render() {
    const {
      searchResponse,
      searchLoading,
      searchError,
      searchParameter,
      articleSearchStatus
    } = this.props;
    if (searchParameter === null || searchParameter.length === 0 ) return (<div className="container" />);
    return (
      <main className="container">
        <SearchNav
          searchStartRequest={this.props.searchStartRequest}
          searchParameter={searchParameter}
        />
        { articleSearchStatus ? (
          <ArticleSearch
            searchRequest={this.props.searchRequest}
            searchParameter={searchParameter}
            searchLoading={searchLoading}
            searchResponse={searchResponse}
            searchError={searchError}
          />
        ) : ' '}
        {
          this.state.searchLoading && (<Spinner />)
        }
      </main>
    );
  }
}


const mapStateToProps = (state) => {
  const { search } = state;
  const {
    searchResponse,
    searchLoading,
    searchError,
    searchParameter,
    articleSearchStatus
  } = search;
  return {
    searchResponse,
    searchLoading,
    searchError,
    searchParameter,
    articleSearchStatus
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  searchRequest, searchArticleRequest
}, dispatch);

Search.propTypes = {
  searchRequest: PropTypes.func.isRequired,
  searchParameter: PropTypes.string.isRequired,
  searchLoading: PropTypes.bool.isRequired,
  searchError: PropTypes.shape({
    message: PropTypes.string
  }),
  articleSearchStatus: PropTypes.bool.isRequired,
  searchResponse: PropTypes.shape({
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    itemsOnPage: PropTypes.number,
    data: PropTypes.shape({
      count: PropTypes.number,
      results: PropTypes.arrayOf(PropTypes.object)
    })
  }).isRequired
};

Search.defaultProps = {
  searchError: {
    error: null
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
