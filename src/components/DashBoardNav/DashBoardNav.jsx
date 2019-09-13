import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './DashBoardNav.scss';

const DashBoardNav = (props) => {
  const { items } = props;
  const showItems = () => items.map((item, i) => (
    <div key={i} className={item.style}>
      <Link to={item.link}>
        <p>{item.text}</p>
      </Link>
    </div>
  ));
  return (
    <div className="dashboard--nav">
      {showItems()}
    </div>
  );
};

DashBoardNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    text: PropTypes.string,
    style: PropTypes.string
  })).isRequired
};


export default DashBoardNav;
