import fetchData from '../../helpers';
import {
  POST_COMMENT_FAILURE,
  POST_COMMENT_SUCCESS,
  LOAD_COMMENTS
} from '../../actionTypes';

export const loadComments = (payload) => ({
  type: LOAD_COMMENTS,
  payload
});

export const success = (payload) => ({
  type: POST_COMMENT_SUCCESS,
  payload
});

export const failure = (payload) => ({
  type: POST_COMMENT_FAILURE,
  payload
});

export const postCommentAction = (commentBody, slug) => async (dispatch) => {
  try {
    const { data } = await
    fetchData('post', `/articles/${slug}/comments`, { comment: commentBody });
    const { comment } = data;
    const commentData = {
      id: comment.id,
      userName: comment.author.userName,
      comment: comment.comment,
      date: comment.createdAt,
      avatarUrl: comment.author.avatarUrl
    };
    dispatch(success(commentData));
  } catch (err) {
    const { response: { data } } = err;
    dispatch(failure(data.error));
  }
};

export default postCommentAction;
