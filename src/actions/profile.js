import axios from 'axios';
import * as types from '../actionTypes';

export const getUserArticles = (token) => async (dispatch) => {
  let data;
  try {
    const response = await axios.get('https://authors-haven-development.herokuapp.com/api/v1/articles/user',
      { headers: { Authorization: token } });
    data = response.data.articles;
  } catch (e) {
    data = e.response.data;
  }
  dispatch({
    type: types.GET_USER_ARTICLES,
    data
  });
};

export const getUserDetails = (token, userName) => async (dispatch) => {
  let data;
  try {
    const response = await axios.get(`https://authors-haven-development.herokuapp.com/api/v1/profiles/${userName}`,
      { headers: { Authorization: token } });
    data = response.data.user;
  } catch (e) {
    data = e.response.data;
  }
  dispatch({
    type: types.GET_USER_DETAILS,
    data
  });
};

export const userArticlesLoading = (status) => ({
  type: types.GET_USER_ARTICLES_LOADING,
  data: status
});

export const userDetailsLoading = (status) => ({
  type: types.GET_USER_DATA_LOADING,
  data: status
});
