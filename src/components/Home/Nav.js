import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Nav = ({ TotalCategories }) => (
  <div className="category-nav">
    <nav>
      <ul>
        {TotalCategories.map(({ id, name, link }) => (
          <li key={id}>
            <Link to={link}>{name}</Link>
          </li>
        ))}
        <li key="more">
          <Link to="/category/">More...</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Nav;

Nav.propTypes = {
  TotalCategories: PropTypes.arrayOf(PropTypes.object).isRequired
};
