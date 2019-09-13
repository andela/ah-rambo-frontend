import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryCard = ({ image, category }) => {
  return (
    <Link to={`/category/${category}`}>
      <div className="card">
        <img className="image" src={image} alt="hey" />
        <h2 className="text">{category}</h2>
      </div>
    </Link>
  );
};

export default CategoryCard;

CategoryCard.propTypes = {
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};
