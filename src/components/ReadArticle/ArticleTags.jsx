import React from 'react';
import Proptypes from 'prop-types';

const ArticleTags = ({ article }) => {
  const searchTag = () => {};

  return (
    <div className="tags">
      {article.tagList && article.tagList.map((item) => (
        <button
          key={item}
          className="article-tag"
          onClick={searchTag}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
};

ArticleTags.propTypes = {
  article: Proptypes.object.isRequired,
};

export default ArticleTags;
