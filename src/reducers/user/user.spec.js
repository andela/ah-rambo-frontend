import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import reducer from './user';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from '../../actionTypes';

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

describe('user reducer test', () => {
  const initialState = {
    userData: {},
    userLoading: false,
    userError: null
  };
  it('returns the initial state details', () => {
    const action = { type: undefined};
    expect(reducer(undefined, action)).toEqual(initialState);
  });

      it('returns users details', () => {
      const initialState = {
        userData: {},
      };
      const action = {
        type: GET_USER_SUCCESS,
        user: data
      }
      expect(reducer({}, action)).toEqual({ ...initialState, userData: action.user, userLoading: false  });
    });


    it('returns users details loading status', () => {
      const initialState = {
        userLoading: false
      };
      const action = {
        type: GET_USER_REQUEST,
      }
      expect(reducer({}, action)).toEqual({ ...initialState, userLoading: true });
    });

    it('fails to return user details', () => {
      const initialState = {
        userError: null,
      };
      const action = {
        type: GET_USER_FAILURE
      }
      expect(reducer({}, action)).toEqual({...initialState, userError: action.userError, userLoading: false });
    });
});
