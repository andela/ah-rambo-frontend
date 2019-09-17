import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'slate-react';
import './CommentBox.scss';

const CommentBox = ({
  commentBody, handleChange, className, editorRef,
  placeholder, handleKeyDown, spellCheck, authenticatedUserAvatar
}) => (
  <div>
    <img
      className="avatar commenter-avatar"
      alt="userName"
      title="userName"
      src={authenticatedUserAvatar}
    />
    <div className="comment-container">
      <Editor
        ref={editorRef}
        placeholder={placeholder}
        value={commentBody}
        className={className}
        spellCheck={spellCheck}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  </div>
);

export default CommentBox;

CommentBox.propTypes = {
  commentBody: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  spellCheck: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  editorRef: PropTypes.func.isRequired,
  authenticatedUserAvatar: PropTypes.string
};


CommentBox.defaultProps = {
  authenticatedUserAvatar: 'https://www.c-sharpcorner.com/UploadFile/AuthorImage/1d311920181013051813.jpg.ashx?width=56&height=56',
  placeholder: 'Press enter to submit. (Min. of 2 characters)'
};
