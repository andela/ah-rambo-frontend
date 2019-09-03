import ReduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import signup from './signup';
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
} from '../../actionTypes';

describe('User Signup Action Creators', () => {
  const mockStore = configureStore([ReduxThunk]);

  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('returns success when request is successful', async () => {
    const store = mockStore({});

    const token = 'token';
    const user = { ...MOCK_USER };

    const expectedActions = [
      { type: USER_SIGNUP_REQUEST },
      { type: USER_SIGNUP_SUCCESS, payload: { token, user } },
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 201, response: { token, user } });
    });

    await store.dispatch(signup(user));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('returns failure when request fails', async () => {
    const store = mockStore({});

    const user = { ...MOCK_USER };
    delete user.confirmPassword;

    const expectedActions = [
      { type: USER_SIGNUP_REQUEST },
      { type: USER_SIGNUP_FAILURE, payload: 'undefined' },
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: {
          errors: { confirmPassword: 'confirm password is required' },
        },
      });
    });

    await store.dispatch(signup(user));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
