import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import reducer from './profile';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

const initialState = {
  userData: {},
  userDataIsLoading: false,
  userArticle: [],
  userArticleIsLoading: false
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

describe('reducer test', () => {
  describe('get profile reducer test', () => {
    it('returns the initial state details', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('returns users details', () => {
      const initialState = {
        userData: {},
      };
      const action = {
        type: 'GET_USER_DETAILS',
        data
      }
      expect(reducer({}, action)).toEqual({ ...initialState, userData: action.data });
    });

    it('returns users article details', () => {
      const initialState = {
        userArticle: []
      };
      const action = {
        type: 'GET_USER_ARTICLES',
        data
      }
      expect(reducer({}, action)).toEqual({ ...initialState, userArticle: action.data });
    });

    it('returns user Details  status onload', () => {
      const initialState = {
        userDataIsLoading: false
      };
      const action = {
        type: 'GET_USER_DATA_LOADING',
        data: false
      }
      expect(reducer({}, action)).toEqual({ ...initialState, userDataIsLoading: action.data });
    });

    it( 'returns users article onloading status', () => {
      const initialState = {
        userArticleIsLoading: false
      };
      const action = {
        type: 'GET_USER_ARTICLES_LOADING',
        data: false
      }
      expect(reducer({}, action)).toEqual({ ...initialState, userArticleIsLoading: action.data });
    });

  });
});
