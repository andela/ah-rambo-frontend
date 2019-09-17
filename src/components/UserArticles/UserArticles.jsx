import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Star,
  Clock
} from '../../../assets/icons';
import './UserArticles.scss';

const UserArticles = (props) => {
  const { data, authorData, articleUrl } = props;
  const { firstName, lastName, avatarUrl } = authorData;
  const showItems = () => data.map((item, i) => (
    <div key={i} className="card">
      <Link to={`/${articleUrl}`}>
        <div className="card-image">
          <img src={item.image} alt={item.title} />
        </div>
        <div className="card-container">
          <div className="author-container">
            <div className="authors-image">
              <img src={avatarUrl} alt={firstName} />
            </div>
            <div className="card-details">
              <span className="card-title">
                <b>
                  {item.title.substring(0, 22)}
            ...
                </b>
              </span>
              <p className="card-description">
                {item.description.substring(0, 50)}
              ...
              </p>
              <div className="author">
                <span>
                  <span className="small-let">
                    <img src={Clock} alt="clock" className="clock" />
                7mins Read
                    <img className="small-let-img" src={Star} alt="star" />
                    <p>{`${firstName} ${lastName}` }</p>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ));
  return (
    <div className="container__article">
      {showItems()}
    </div>
  );
};

UserArticles.propTypes = {
  articleUrl: PropTypes.string.isRequired,
  authorData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
    followingsCount: PropTypes.number
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string
  }))
};
export default UserArticles;
