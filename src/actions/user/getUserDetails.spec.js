import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import getUserDetails from './getUserDetails';
import { GET_USER_SUCCESS, GET_USER_FAILURE } from '../../actionTypes';

describe('Get user details action Test', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  it('dispatch getUserDetails function when it mounts', () => {
    const store = mockStore({});
    const expectedState = {
      firstName: 'John',
      lastName: 'Doe',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });

    return store.dispatch(getUserDetails()).then(() => {
      const actions = store.getActions();
      expect(actions[1].type).toBe(GET_USER_SUCCESS);
    });
  });

  it('dispatch getUserProfile and fails to get user when it mounts', () => {
    const store = mockStore({});
    const expectedState = {
      firstName: 'John',
      lastName: 'Doe',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 401,
        response: expectedState,
      });
    });

    return store.dispatch(getUserDetails()).then(() => {
      const actions = store.getActions();
      expect(actions[1].type).toBe(GET_USER_FAILURE);
    });
  });
});
