import React from 'react';
import PropTypes from 'prop-types';
import ArticleSearchCard from '../ArticleSearchCard/ArticleSearchCard';
import './ArticleSearch.scss';
import Pagination from '../Pagination/Pagination';

const ArticleSearch = (props) => {
  const {
    searchRequest, searchParameter, searchLoading, searchResponse,
  } = props;
  if (searchLoading) searchRequest('article', searchParameter, 1);
  return (
    <div className="article__search__container">
      {Object.keys(searchResponse) && Object.keys(searchResponse).length !== 0 ? (
        <ArticleSearchCard
          searchResponse={searchResponse}
        />
      ) : ' '}
      {
        (Object.keys(searchResponse).length !== 0 && searchResponse.data.count > 0) ? (
          <Pagination
            query="article"
            totalPages={searchResponse.totalPages}
            parameter={searchParameter}
            searchRequest={searchRequest}
            currentPage={searchResponse.currentPage}
          />
        ) : ' '
      }
    </div>
  );
};


ArticleSearch.propTypes = {
  searchRequest: PropTypes.func.isRequired,
  searchParameter: PropTypes.string.isRequired,
  searchLoading: PropTypes.bool.isRequired,
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
export default ArticleSearch;
