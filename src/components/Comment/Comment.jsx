/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plain from 'slate-plain-serializer';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import renderHTML from 'react-render-html';
import formatDate from '../../helpers/formatDate';
import commentBodySchema from '../../schemas/comment';
import CommentCard from '../common/CommentCard/CommentCard';
import postCommentAction, { loadComments as loadCommentsAction }
  from '../../actions/comment/postComment';
import CommentBox from '../common/CommentBox/CommentBox';
import './Comment.scss';

export class Comment extends Component {
  state = {
    commentBody: Plain.deserialize(''),
    commentsToRender: 5,
    verifyAccountError: '',
    validationError: '',
  };

  componentDidMount = () => {
    const { props: { loadComments, article: { comments } } } = this;
    loadComments(comments);
  }

  validateInput = (comment) => {
    const VALIDATION_OPTION = { abortEarly: false };
    const { error } = Joi.validate({ comment },
      commentBodySchema, VALIDATION_OPTION);
    if (!error) return null;
    const { details: [errorDetails] } = error;
    return errorDetails.message;
  };

  handleChange = (input) => (event) => {
    const { value } = event;
    this.setState({
      [input]: value
    });
  }

  handleKeyDown = (event, editor, next) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!event.shiftKey) {
        return this.handleSubmit();
      }
    }
    next();
  }

  handleSubmit = async () => {
    const {
      validateInput,
      props: { postComment, slug },
      state: { commentBody }
    } = this;
    const comment = Plain.serialize(commentBody);
    const validationError = validateInput(comment);
    this.setState({ validationError });
    if (!validationError) {
      await postComment(comment, slug);
      this.setState({ commentBody: Plain.deserialize('') });
    }
  }

  editorRef = (editor) => {
    this.editor = editor;
  };

createCommentListings = (comments, commentsToRender) => {
  const data = comments.slice(0, commentsToRender).map((commentBody, index) => {
    const {
      avatarUrl, userName, comment, date
    } = commentBody;
    const key = index;
    return (
      <CommentCard
        key={key}
        avatar={avatarUrl}
        userName={userName}
        date={formatDate(date)}
        commentText={renderHTML(comment)}
      />
    );
  });
  return data;
}

handleViewMoreComments = () => {
  this.setState((prevState) => ({
    commentsToRender: prevState.commentsToRender + 5
  }));
}


/**
  * @name render
  * @returns {HTML} HTML DOM elements
*/
render() {
  const {
    handleKeyDown, editorRef, handleSubmit, handleChange,
    handleViewMoreComments,
    state: {
      commentBody, commentsToRender, verifyAccountError, validationError
    }, props: { commentData: { comments, error }, }
  } = this;

  const { length: numberOfComments } = comments;
  return (
    <div className="comment-section ">
      <p className="comment__info__text">Add your Comment: </p>
      <CommentBox
        commentBody={commentBody}
        handleChange={handleChange('commentBody')}
        className="comment-box"
        handleSubmit={handleSubmit}
        editorRef={editorRef}
        handleKeyDown={handleKeyDown}
        spellCheck
      />
      <p className="input-validation-error">
        {error || validationError}
      </p>
      <p className="comment-number">
          Comments (
        {numberOfComments}
          )
      </p>
      {this.createCommentListings(comments, commentsToRender)}
      { commentsToRender < numberOfComments ? (
        <p>
          <span
            onClick={handleViewMoreComments}
            className="comment-number view__more__comments"
          >
      View more comments (
            {numberOfComments - commentsToRender}
      )
          </span>
        </p>
      ) : ''}
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  commentData: state.postComment,
  article: state.readArticle.article,
});

const mapDispatchToProps = {
  postComment: postCommentAction,
  loadComments: loadCommentsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

Comment.propTypes = {
  loadComments: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  commentData: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
};
