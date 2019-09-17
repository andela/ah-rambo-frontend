import {
  GET_USER_ARTICLES_REQUEST,
  GET_USER_ARTICLES_SUCCESS,
  GET_USER_ARTICLES_FAILURE
} from '../../actionTypes';

const initialState = {
  articleData: {
    total: 0,
    data: []
  },
  articleLoading: false,
  articleError: null
};
export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case GET_USER_ARTICLES_REQUEST:
      return { ...state, articleLoading: true };
    case GET_USER_ARTICLES_SUCCESS:
      return {
        ...state,
        articleLoading: false,
        articleData: action.articles
      };
    case GET_USER_ARTICLES_FAILURE:
      return {
        ...state,
        articleLoading: false,
        articleError: action.articleError
      };
    default:
      return state;
  }
};
