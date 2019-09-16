import React from 'react';
import Proptypes from 'prop-types';
import { dateFormatter, getReadTime } from '../../helpers/utils';

const ArticleAuthor = ({ article }) => {
  const getProfile = (userName) => {};
  return (
    <div>
      {article.Author && (
        <div className="article-author">
          <img
            src={article.Author.avatarUrl}
            alt="avatar url"
            className="avatar"
          />
          <div className="article-author-details">
            <b
              className="article-author-name"
              onClick={() => getProfile(article.Author.userName)}
              role="button"
              tabIndex={0}
              onKeyDown={() => getProfile(article.Author.userName)}
            >
              {article.Author.firstName}
              &nbsp;
              {article.Author.lastName}
            </b>
            <div>{dateFormatter(article.publishedAt)}</div>
          </div>
          <div className="reading-time">
            {getReadTime(article.articleBody)}
            {' '}
            min read
          </div>
        </div>
      )}
    </div>
  );
};

ArticleAuthor.propTypes = {
  article: Proptypes.object.isRequired
};

export default ArticleAuthor;
