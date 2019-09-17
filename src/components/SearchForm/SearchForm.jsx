import React from 'react';
import './SearchForm.scss';
import { SearchIcon } from '../../../assets/icons';

const SearchForm = (props) => (
  <form className="SearchForm" onSubmit={props.handleSubmit}>
    <span className="search-icon">
      <img src={SearchIcon} alt="Search Icon" />
    </span>

    <input className="SearchForm__input" name="SearchForm" type="search" placeholder="Search" />
  </form>
);

export default SearchForm;
