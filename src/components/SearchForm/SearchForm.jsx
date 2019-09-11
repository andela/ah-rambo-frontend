import React from 'react';
import './SearchForm.scss';
import { SearchIcon } from '../../../assets/icons';

const SearchForm = () => (
  <form className="SearchForm">
    <span className="search-icon">
      <img src={SearchIcon} alt="Search Icon" />
    </span>

    <input className="SearchForm__input" type="search" placeholder="Search" />
  </form>
);

export default SearchForm;
