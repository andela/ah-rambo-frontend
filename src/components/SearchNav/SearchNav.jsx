import React from 'react';
import './searchNav.scss';

const SearchNav = (props) => {
  const { searchParameter } = props;
  return (
    <div>
      <div className="search__search-text">
    Search Results for
        <span className="search__paramater">{searchParameter}</span>
      </div>
      <div className="search__options">
        <span className="search__category--focus">Articles</span>
        <span className="search__category">People</span>
        <span className="search__category">Tags</span>
      </div>
    </div>
  );
};

export default SearchNav;
