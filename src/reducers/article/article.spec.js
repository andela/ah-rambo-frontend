import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import reducer from './article';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_ARTICLES_REQUEST,
  GET_USER_ARTICLES_SUCCESS,
  GET_USER_ARTICLES_FAILURE
} from '../../actionTypes';

const initialState = {
  userData: {},
  userDataLoading: false,
  userArticle: {
    total: 0,
    data: []
  },
  userArticleLoading: false,
  userError: null,
  articleError: null
};

const data = {
  firstName: 'Deborah',
  lastName: 'Oke',
  userName: 'Debby',
  avatarUrl: 'https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png',
  followingsCount: 0,
  followersCount: 0,
  location: 'Lagos Nigeria',
  createdAt: 'April, 2018'
};

  describe('article reducer test', () => {
    
    it('returns the initial state details', () => {
      const action = { type: undefined};
      const initialState = {
        articleData: {
          total: 0,
          data: []
        },
        articleLoading: false,
        articleError: null
      };
      expect(reducer(undefined, action)).toEqual(initialState);
    });

    it('returns users article details', () => {
      const initialState = {
        articleData: {
          total: 0,
          data: []
        },
      };
      const action = {
        type: GET_USER_ARTICLES_SUCCESS,
        articles: {
          total: 0,
          data: []
        }
      }
      expect(reducer({}, action)).toEqual({ ...initialState, articleData: action.articles, articleLoading: false, });
    });

    it('fails to return users article details', () => {
      const initialState = {
        articleError: null
      };
      const action = {
        type: GET_USER_ARTICLES_FAILURE,
        articleError: {
          message: 'session expired'
        },
      }
      expect(reducer({}, action)).toEqual({ ...initialState, articleError: action.articleError, articleLoading: false  });
    });

    it('returns users articles ', () => {
      const initialState = {
        articleLoading: false,
      };
      const action = {
        type: GET_USER_ARTICLES_REQUEST,
      }
      expect(reducer({}, action)).toEqual({ ...initialState, articleLoading: true });
    });
  });
