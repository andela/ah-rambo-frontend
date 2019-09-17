import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  ARTICLE_SEARCH_REQUEST
} from '../../actionTypes';

const initialState = {
  searchResponse: {},
  searchLoading: false,
  searchError: null,
  searchParameter: null,
  articleSearchStatus: true,
  tagSearchStatus: false,
  peopleSearchStatus: false
};
export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { ...state, searchParameter: action.searchParameter, searchLoading: true };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchResponse: action.searchData
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        searchLoading: false,
        searchError: action.searchError
      };
    case ARTICLE_SEARCH_REQUEST:
      return {
        ...state,
        articleSearchStatus: true,
        tagSearchStatus: false,
        peopleSearchStatus: false
      };
    default:
      return state;
  }
};
