import * as actionTypes from '../../actionTypes';

const initialState = {
  isLoading: false,
  allTags: ['...'],
  allCategories: ['...'],
  data: null,
  error: null
};

const createArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false
      };
    case actionTypes.CREATE_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.errors,
        isLoading: false
      };
    case actionTypes.CREATE_ARTICLE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.GET_TAG:
      return {
        ...state,
        allTags: action.data
      };
    case actionTypes.GET_CATEGORY:
      return {
        ...state,
        allCategories: action.data
      };
    default:
      return state;
  }
};

export default createArticleReducer;
