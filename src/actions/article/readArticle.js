import {
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_FAILURE
} from '../../actionTypes';
import fetchData from '../../helpers';

const getArticle = (slug, history) => async (dispatch) => {
  dispatch({
    type: GET_ARTICLE_REQUEST
  });
  try {
    const url = `/articles/read/${slug}`;
    const { data } = await fetchData('get', url);
    dispatch({
      type: GET_ARTICLE_SUCCESS,
      data: data.article
    });
  } catch (error) {
    const {
      data: { error: articleError }
    } = error.response;
    if (articleError === 'article not found') history.push('/notfound');
    dispatch({
      type: GET_ARTICLE_FAILURE,
      error: error.response
    });
  }
};

export default getArticle;
