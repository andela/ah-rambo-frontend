import axios from 'axios';
import * as actionTypes from '../../actionTypes';
import fetchData from '../../helpers';

const config = {
  headers: { 'content-type': 'multipart/form-data' }
};

export const CREATE_ARTICLE_SUCCESS = (data) => ({
  type: actionTypes.CREATE_ARTICLE_SUCCESS,
  data
});

export const CREATE_ARTICLE_FAILURE = ({ errors }) => ({
  type: actionTypes.CREATE_ARTICLE_FAILURE,
  errors
});

export const CREATE_ARTICLE_REQUEST = () => ({
  type: actionTypes.CREATE_ARTICLE_REQUEST
});

export const GET_TAG = (data) => ({
  type: actionTypes.GET_TAG,
  data
});
export const GET_CATEGORY = (data) => ({
  type: actionTypes.GET_CATEGORY,
  data
});

export const createArticle = (body, push) => async (dispatch) => {
  dispatch(CREATE_ARTICLE_REQUEST());
  try {
    const response = await fetchData('post', '/articles/create', body, config);
    push(`/article/${response.data.slug}`);
    return dispatch(CREATE_ARTICLE_SUCCESS(response.data));
  } catch (error) {
    let errorMessage;
    if (error.response) errorMessage = error.response.data;
    else errorMessage = { message: error.errors };

    return dispatch(CREATE_ARTICLE_FAILURE(errorMessage));
  }
};

export const getTags = () => async (dispatch) => {
  try {
    const response = await fetchData('get', '/tags');
    return dispatch(GET_TAG(response.data.tags));
  } catch (error) {
    return false;
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const response = await fetchData('get', '/categories');
    return dispatch(
      GET_CATEGORY(
        response.data.categories.map(({ name }) => name).sort()
      )
    );
  } catch (error) {
    return false;
  }
};
