import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HorizontalArticleCards = () => {
  return (
    <Link to="/article/slug">
      <figure className="flex row cards article-card-link">
        <img className="figure-image" src="https://picsum.photos/id/492/600/600" alt="" />
        <figcaption className="flex column figcaption">
          <h6>Sailing adventures in tailand</h6>
          <p className="description">
            the tails of science adventures of tailand sailors navigating the seas. the tails of
            science adventures of tailand sailors navigating the seas...
          </p>
          <div className="flex fig-bottom-container">
            <p className="author">HUGO FERNANDES</p>
            <p>7 mins Read</p>
            <div className="like-dislike">
              <span className="like">20</span>
              <span className="dislike">30</span>
            </div>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
};

export default HorizontalArticleCards;
