import React from 'react';
import Icon from 'react-icons-kit';
import PropTypes from 'prop-types';
import { clock } from 'react-icons-kit/icomoon/clock';
import { threeVertical } from 'react-icons-kit/entypo/threeVertical';
import './CommentCard.scss';

const CommentCard = ({
  avatar, userName, date, commentText
}) => (
  <div className="cards">
    <div className="comment-body">
      <div className="avatar">
        <a href="https://">
          <img
            className="avatar"
            alt={userName}
            title={userName}
            src={avatar}
          />
        </a>
      </div>
      <div className="comment-detail">
        <div className="comment-header">
          <div className="comment-info">
            <span className="author">{userName}</span>
            <span className="comment-date">
              <Icon icon={clock} />
              {date}
            </span>
          </div>
          <div calss="comment-action">

            <span>
              <Icon
                className="threeVertical"
                icon={threeVertical}
              />
            </span>
          </div>
        </div>
        <p className="comment-text">{commentText}</p>
      </div>
    </div>
  </div>
);

export default CommentCard;


CommentCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  commentText: PropTypes.string.isRequired,
};
