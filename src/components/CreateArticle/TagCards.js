import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../common';


const TagCard = ({ tags, removeTag, disable }) => {
  const tagClass = tags ? 'tag-cards-container' : 'noDisplay';
  let brClass;
  if (!tags) brClass = 'noDisplay';

  return (
    <>
      <br className={brClass} />
      <div className={tagClass}>
        {tags.split(',').filter((tag) => tag !== '').map((tag) => (
          <div className="tag-cards" disabled={disable} key={tag}>
            {tag}
            <Button onClick={removeTag(tag)} disabled={disable} type="button" className="tag-cards-close" label="x" />
          </div>
        ))}
      </div>
    </>
  );
};

TagCard.propTypes = {
  tags: PropTypes.string.isRequired,
  removeTag: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired
};

export default TagCard;
