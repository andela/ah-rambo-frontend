import axios from 'axios';
import * as types from '../../actionTypes';
import fetchData from '../../helpers';

const articleRequest = () => ({ type: types.GET_USER_ARTICLES_REQUEST });
 const articleSuccess = (articles) => ({ type: types.GET_USER_ARTICLES_SUCCESS, articles });
 const articleFailure = (articleError) => ({ type: types.GET_USER_ARTICLES_FAILURE, articleError });

const getUserArticles = () => async (dispatch) => {
  dispatch(articleRequest());
  try {
    const articleUrl = 'articles/user';
    const response = await fetchData('get', articleUrl, {});
    const { articles } = response.data;
    dispatch(articleSuccess(articles));
  } catch (e) {
    const articleError = e.response.data;
    dispatch(articleFailure(articleError));
  }
};

export default getUserArticles;
