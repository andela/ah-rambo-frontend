import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  authUser, deAuthUser
} from './index';

import { AUTHENTICATE_USER, DEAUTHENTICATE_USER } from '../../actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
it('dispatch authenticate action', () => {
  const store = mockStore({});
  const expectedAction = [
    { type: 'AUTHENTICATE_USER' }
  ];
  store.dispatch(authUser());
  expect(store.getActions()).toEqual(expectedAction);
});

it('dispatch deauthenticate action', () => {
  const store = mockStore({});
  const expectedAction = [
    { type: 'DEAUTHENTICATE_USER' }
  ];
  store.dispatch(deAuthUser());
  expect(store.getActions()).toEqual(expectedAction);
});
