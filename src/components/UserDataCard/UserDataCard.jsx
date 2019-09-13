import React from 'react';
import './UserDataCard.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserDataCard = (props) => {
  const { userDetails, total } = props;
  const {
    firstName, lastName, userName,
    avatarUrl, followingsCount,
    followersCount, location, createdAt
  } = userDetails;
  return (
    <div className="user--card--data">
      <div className="user--card__avatar">
        <img src={avatarUrl} alt="avatar img" />
      </div>
      <div className="user--card__content">
        <div>
          <span className="user--card__content__title">{ `${firstName} ${lastName}` }</span>
          <p className="user--card__content__subtitle">
            { userName }
          </p>
        </div>
        <div className="user--card__content__details">
          <ul className="user--card__username">
            <li className="user--card__userdetails">
              { total }
              {' '}
              posts
            </li>
            <li className="user--card__userdetails">
              { `${followingsCount} Followings` }
            </li>
            <li className="user--card__userdetails">
              {
                `${followersCount} Followers`
              }
            </li>
          </ul>
          <ul className="bold user--card__username">
            <li className="user--card__userdetails">
              {`${location === null ? 'Lagos, Nigeria' : location}` }
            </li>
            <li className="user--card__userdetails">
              Joined:
              { createdAt === null ? 'April, 2018' : createdAt }
            </li>
          </ul>
          <div className="edit-btn-mobile">
            <Link to="/">Edit</Link>
          </div>
        </div>
        <div />
      </div>
      <div>
        <Link to="/" className="edit-btn">Edit</Link>
      </div>
    </div>
  );
};

UserDataCard.propTypes = {
  total: PropTypes.number.isRequired,
  userDetails: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userName: PropTypes.string,
    avatarUrl: PropTypes.string,
    followingsCount: PropTypes.number,
    followersCount: PropTypes.number,
    location: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired
};

export default UserDataCard;
