import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';
import {requestPasswordLink, success, failure, requestPassword} from './requestPassword';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
const mock = new MockAdapter(axios);

const store = mockStore({
  isLoading: false
});

const payload = {};

payload.error =  'email address not found';
payload.message = 'Password reset link sent';
const data = {message: payload.message}

const emailAdress = {registered:'teamrambo@gmail.com', unknown: 'tema@gmail.com'}

const BACKEND_URL = process.env.SERVER_URL;

describe('request password action test', () => {
  it('send an empty payload upon user hitting the submit button', () => {
    const expectedAction = {
      type: 'REQUEST_PASSWORD_REQUEST'
    }

    const action =  requestPasswordLink()
    expect(action).toEqual(expectedAction);
  })

  it('sends success message to the user', () => {
    const expectedAction = {
      type: 'REQUEST_PASSWORD_SUCCESS',
      payload: { ...data }
    }

    const action =  success(data)
    expect(action).toEqual(expectedAction);
  })

  it('sends failure message when email address given is not found', () => {
    const error = {message: payload.error}
    const expectedAction = {
      type: 'REQUEST_PASSWORD_FAILURE',
      payload: { error: error.message }
    }

    const action =  failure(error)
    expect(action).toEqual(expectedAction);
  })

  it('dispatches an action to send successful message to the user', () => {
    const expectedActions = ['REQUEST_PASSWORD_REQUEST', 'REQUEST_PASSWORD_SUCCESS']
    mock.onPost(`${BACKEND_URL}/users/resetpassword`).reply(200, {
      message: 'Password has been sent'
    });    
   store.dispatch(requestPassword({email: 'teamrambo@gmail.com'})).then(() => {
      const dispatchedActions = store.getActions();

      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);

    });
  });

  it('dispatches an action to send failure message to the user', () => {
    const expectedActions = ['REQUEST_PASSWORD_REQUEST', 'REQUEST_PASSWORD_FAILURE']
    mock.onPost(`${BACKEND_URL}/users/resetpassword`).reply(404, {
      message: 'Password link sent'
    });    
   store.dispatch(requestPassword({email: 'teama@gmail.com'})).catch(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    });
  });
})
