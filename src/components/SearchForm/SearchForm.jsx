import React from 'react';
import './SearchForm.scss';
import searchIcon from '../../../assets/search-magnifier-interface-symbol.png';

const SearchForm = () => (
  <form className="SearchForm">
    <span className="search-icon">
      <img src={searchIcon} alt="Search Icon" />
    </span>

    <input className="SearchForm__input" type="search" placeholder="Search" />
  </form>
);

export default SearchForm;
