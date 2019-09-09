import ReduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import signupAction from './signupAction';
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
} from '../../actionTypes';

const MOCK_USER = {
  firstName: 'John',
  lastName: 'Doe',
  userName: 'john101',
  email: 'john@doe.com',
  password: 'john@doe.com',
  confirmPassword: 'john@doe.com',
};

describe('Signup Action Creators', () => {
  const mockStore = configureStore([ReduxThunk]);

  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('returns success when request is successful', async () => {
    const store = mockStore({});

    const token = 'token';
    const user = { ...MOCK_USER };

    const expectedActions = [
      { type: USER_SIGNUP_REQUEST },
      { type: USER_SIGNUP_SUCCESS },
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

    const user = { ...MOCK_USER };
    delete user.confirmPassword;

    const expectedActions = [
      { type: USER_SIGNUP_REQUEST },
      { type: USER_SIGNUP_FAILURE, error: undefined },
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
