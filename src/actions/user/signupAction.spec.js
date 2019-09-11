import ReduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import signupAction from './signupAction';
import { newUser } from '../../helpers/mockData';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../../actionTypes';

describe('Signup Action Creators', () => {
  const mockStore = configureStore([ReduxThunk]);

  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('returns success when request is successful', async () => {
    const store = mockStore({});

    const token = 'token';
    const user = { ...newUser };

    const expectedActions = [
      { type: SIGNUP_REQUEST },
      { type: SIGNUP_SUCCESS },
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 201, response: { token, user } });
    });

    await store.dispatch(signupAction(user));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('returns failure when request fails', async () => {
    const store = mockStore({});

    const user = { ...newUser };
    delete user.confirmPassword;

    const expectedActions = [
      { type: SIGNUP_REQUEST },
      { type: SIGNUP_FAILURE, error: undefined },
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

    await store.dispatch(signupAction(user));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
