import {
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_FAILURE
} from '../../actionTypes';
import fetchData from '../../helpers';

const getArticle = (slug) => async (dispatch) => {
  dispatch({
    type: GET_ARTICLE_REQUEST
  });
  try {
    const url = `articles/read/${slug}`;
    const { data: { article } } = await fetchData('get', url);

    let { comments } = article;
    comments = comments.reverse().map((comment) => ({
      id: comment.id,
      userName: comment.author.userName,
      comment: comment.comment,
      date: comment.createdAt,
      avatarUrl: comment.author.avatarUrl
    }));

    dispatch({
      type: GET_ARTICLE_SUCCESS,
      data: { article, comments }
    });
  } catch (error) {
    dispatch({
      type: GET_ARTICLE_FAILURE,
      error: error.response
    });
  }
};

export default getArticle;
