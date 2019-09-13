import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const VerticalArticleCard = ({
  image = 'https://picsum.photos/id/492/600/600',
  title = 'Sailing adventures in tailand',
  description = `the tails of science adventures of tailand sailors navigating the seas. the tails of
  science adventures of tailand sailors navigating the seas...`,
  author = 'HUGO FERNANDES',
  avatarUrl = 'https://picsum.photos/id/1027/600/600',
  likesCount = 20,
  dislikeCount = 20,
  readTime = 7
}) => (
  <figure className="cards article-card-link">
    <Link to="/article/slug">
      <img className="figure-image" src={image} alt="hey" />
      <figcaption>
        <h6>{title}</h6>
        <p className="description">
          {description}
          {'...'}
        </p>
        <div className="flex">
          <img className="profile" src={avatarUrl} alt="" />
          <div className="flex fig-bottom-container">
            <div className="flex column fig-bottom">
              <p className="author">{author}</p>
              <p>
                {readTime}
                {'mins Read'}
              </p>
            </div>
            <div className="like-dislike">
              <span className="like">{likesCount}</span>
              <span className="dislike">{dislikeCount}</span>
            </div>
          </div>
        </div>
      </figcaption>
    </Link>
  </figure>
);

export default VerticalArticleCard;

VerticalArticleCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  dislikeCount: PropTypes.number.isRequired,
  readTime: PropTypes.number.isRequired
};
