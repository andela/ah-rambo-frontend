import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

const Pagination = (props) => {
  const {
    query,
    parameter,
    totalPages,
    searchRequest
  } = props;


  let { currentPage } = props;
  const pageNumbers = [];
  if (totalPages > 0) {
    for (let i = 1; i <= totalPages; i += 1) {
      pageNumbers.push(i);
    }
  }

  const handleCurrentChange = (val) => {
    let newValue = val > 1 ? val : 1;
    newValue = parseInt(newValue, 10);
    return newValue;
  };

  let nextPage;

  const renderPageNumbers = pageNumbers.map((number, i) => {
    const style = currentPage === number ? 'active' : 'non-active';
    const pageNumber = handleCurrentChange(number);
    return (
      <span
        key={i}
        className={style}
        onClick={() => {
          searchRequest(query, parameter, pageNumber);
        }}
      >
        {number}
      </span>
    );
  });

  return (
    <div className="pagination">
      <span
        className="navigation-back"
        onClick={() => {
          currentPage -= 1;
          nextPage = handleCurrentChange(currentPage);
          searchRequest(query, parameter, currentPage);
        }}
      >
        {currentPage > 1 ? 'Back' : '' }
      </span>
      { renderPageNumbers }
      <span
        className="navigation-next"
        onClick={() => {
          currentPage += 1;
          nextPage = handleCurrentChange(currentPage);
          searchRequest(query, parameter, currentPage);
        }}
      >
        {currentPage < totalPages && totalPages > 1 ? 'Next' : ''}
      </span>
    </div>
  );
};
Pagination.propTypes = {
  searchRequest: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  parameter: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
