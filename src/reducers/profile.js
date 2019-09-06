import {
  GET_USER_ARTICLES, GET_USER_DETAILS, GET_USER_ARTICLES_LOADING, GET_USER_DATA_LOADING
} from '../actionTypes';

const initialState = {
  userData: {},
  userDataIsLoading: false,
  userArticle: [],
  userArticleIsLoading: false
};

const profile = (state = { ...initialState }, action) => {
  switch (action.type) {
  case GET_USER_ARTICLES:
    return { ...state, userArticle: action.data };
  case GET_USER_DETAILS:
    return { ...state, userData: action.data };
  case GET_USER_ARTICLES_LOADING:
    return { ...state, userArticleIsLoading: action.data };
  case GET_USER_DATA_LOADING:
    return { ...state, userDataIsLoading: action.data };
  default:
    return state;
  }
};

export default profile;
