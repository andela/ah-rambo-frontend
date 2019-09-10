import {login} from './login';
import ReduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';

const user = {
user:{
    userName: "escanor",
    password: "incorrect",
}}

const error = {
    message: "incorrect username or password"
};

describe('User Login Action Test', () => {
    const mockStore = configureStore([ReduxThunk]);
  
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
  
    it('returns success when login is succesfull', async () => {
      const store = mockStore({});
      const expectedActions = [
        { type: 'LOGIN_REQUEST' },
        { type: 'LOGIN_SUCCESS', user },
      ];
  
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: user });
      });
      await store.dispatch(login(user));
      expect(store.getActions()).toEqual(expectedActions);
    });
  
    it('returns failure when login fails', async () => {
        const store = mockStore({});
    const expectedActions = [
        { type: 'LOGIN_REQUEST' },
        { type: 'LOGIN_FAILURE', error },
      ];
  
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: {
            message: "incorrect username or password"
        },
        });
      });
  
      await store.dispatch(login(user));
      expect(store.getActions()).toEqual(expectedActions);
    });
    
  });
