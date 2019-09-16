import axios from 'axios';
import * as types from '../../actionTypes';
import fetchData from '../../helpers';

const searchStartRequest = (searchParameter) => ({ type: types.SEARCH_REQUEST, searchParameter });
const searchSuccess = (searchData) => ({ type: types.SEARCH_SUCCESS, searchData });
const searchFailure = (searchError) => ({ type: types.SEARCH_FAILURE, searchError });
const searchArticleRequest = () => ({ type: types.ARTICLE_SEARCH_REQUEST });

const searchRequest = (query, parameter, pageno) => async (dispatch) => {
  dispatch(searchStartRequest(parameter));
  try {
    const searchUrl = `search/?${query}=${parameter}&page=${pageno}`;
    const response = await fetchData('get', searchUrl, {});
    const responseData = response.data;
    dispatch(searchSuccess(responseData));
  } catch (e) {
    const searchError = e.response.data;
    dispatch(searchFailure(searchError));
  }
};

export {
  searchRequest,
  searchStartRequest,
  searchArticleRequest
};
