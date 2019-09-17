import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import reducer from './search';
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

  describe('article reducer test', () => {

    it('returns the initial state details', () => {
      const action = { type: undefined};
      expect(reducer(undefined, action)).toEqual(initialState);
    });

    it('returns users article searched successfully', () => {
      const initialState = {
        searchResponse: {
          currentPage: 1,
          totalPages: 3
        },
      };
      const action = {
        type: SEARCH_SUCCESS,
        searchData: {
          currentPage: 1,
          totalPages: 3
        }
      }
      expect(reducer({}, action)).toEqual({ ...initialState, searchResponse: action.searchData, searchLoading: false, });
    });

    it('fails to return article searched', () => {
      const initialState = {
        searchError: {}
      };
      const action = {
        type: SEARCH_FAILURE,
        searchError: {}
      }
      expect(reducer({}, action)).toEqual({ ...initialState, searchError: action.searchError, searchLoading: false, });
    });

    it('makes request to search article successfully', () => {
      const initialState = {
        searchParameter: 'hello-world'
      };
      const action = {
        type: SEARCH_REQUEST,
        searchParameter: 'hello-world'
      }
      expect(reducer({}, action)).toEqual({ ...initialState, searchParameter: action.searchParameter, searchLoading: true, });
    });

    it('makes request to search article only', () => {
      const initialState = {
        articleSearchStatus: true,
        peopleSearchStatus: false,
        tagSearchStatus: false,
      };
      const action = {
        type: ARTICLE_SEARCH_REQUEST,
        searchParameter: 'hello-world-2'
      }
      expect(reducer({}, action)).toEqual({ ...initialState});
    });
  });
