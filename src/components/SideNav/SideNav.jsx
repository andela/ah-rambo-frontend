import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SideNav.scss';

const SideNav = (props) => {
  const { items } = props;

  const showItems = () => items.map((item, i) => (
    <div key={i} className="sidenav__options ">
      <Link to={item.link}>
        <div className="sidenav__container">
          <div className={item.container}>
            <img src={item.iconUrl} alt="icon img" className={item.style} />
          </div>
          <p className="item-text">{item.text}</p>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="sideNav">
      {showItems()}
    </div>
  );
};

SideNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.func,
    iconUrl: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string
  })).isRequired
};

export default SideNav;
