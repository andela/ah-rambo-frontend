import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import getUserDetails from './getUserDetails';
import { AUTHENTICATE_USER, DEAUTHENTICATE_USER } from '../../actionTypes';

describe('Get user details action Test', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  it('dispatch getUserDetails action sucessfully', () => {
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
      expect(actions[1].type).toBe(AUTHENTICATE_USER);
    });
  });

  it('dispatch getUserProfile failure ', () => {
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
      expect(actions[1].type).toBe(DEAUTHENTICATE_USER);
    });
  });
});
