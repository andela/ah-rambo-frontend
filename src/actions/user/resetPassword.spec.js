import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';
import {resetPassword, resetPasswordAction, success, failure} from './resetPassword';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
const mock = new MockAdapter(axios);

const store = mockStore({
  isLoading: false
});

const payload = {};
const body =  {password:'teamrambo', confirmPassword:'teamrambo'}
const token = 'justToken'

payload.error =  'Link used or expired'
payload.message = 'Password reset successfully';
const data = {message: payload.message}

const BACKEND_URL = 'https://authors-haven-development.herokuapp.com/api/v1';

describe('reset password action test', () => {
  it('send an empty payload upon user hitting the submit button', () => {
    const expectedAction = {
      type: 'RESET_PASSWORD_REQUEST',
      payload: {}
    }

    const action =  resetPassword()
    expect(action).toEqual(expectedAction);
  })

  it('sends success message to the user', () => {
    const expectedAction = {
      type: 'RESET_PASSWORD_SUCCESS',
      payload: { ...data }
    }

    const action =  success(data)
    expect(action).toEqual(expectedAction);
  })

  it('sends failure message when email address given is not found', () => {
    const error = {message: payload.error}
    const expectedAction = {
      type: 'RESET_PASSWORD_FAILURE',
      payload: { error: error.error }
    }

    const action =  failure(error)
    expect(action).toEqual(expectedAction);
  })

  it('dispatches an action to send successful message to the user', () => {
    const expectedActions = ['RESET_PASSWORD_REQUEST', 'RESET_PASSWORD_SUCCESS']
    mock.onPatch(`${BACKEND_URL}/users/resetpassword/${token}`).reply(200, {
      message: 'Password reset successfully'
    });    
   store.dispatch(resetPasswordAction(body, token)).then(() => {
      const dispatchedActions = store.getActions();

      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    });
  });

  it('dispatches an action to send failure message to the user', () => {
    const expectedActions = ['RESET_PASSWORD_REQUEST', 'RESET_PASSWORD_FAILURE']
    mock.onPatch(`${BACKEND_URL}/users/resetpassword/${token}`).reply(401, {
      message: 'Link used or expired'
    });    
   store.dispatch(resetPasswordAction(body, token)).catch(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    });
  });

})
