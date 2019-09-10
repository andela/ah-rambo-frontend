import signupReducer from './signupReducer';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../../actionTypes';

describe('Signup Reducer', () => {
  const INITIAL_STATE = {
    signedUp: false,
    isLoading: false,
    error: null,
  };

  it('sets the state parameter to initial state when it is undefined', () => {
    const outcome = signupReducer(undefined, {});
    expect(outcome).toMatchObject(INITIAL_STATE);
  });

  it('returns initial state when no action is dispatched', () => {
    const outcome = signupReducer(INITIAL_STATE, {});
    expect(outcome).toMatchObject(INITIAL_STATE);
  });

  it('returns a state to indicate when the signup request is ongoing', () => {
    const payload = { ...INITIAL_STATE, isLoading: true };
    const action = { type: SIGNUP_REQUEST };
    const outcome = signupReducer(INITIAL_STATE, action);
    expect(outcome).toMatchObject(payload);
  });

  it('returns a state to indicate when the signup request is completed', () => {
    const payload = { ...INITIAL_STATE, signedUp: true, isLoading: false };
    const action = { type: SIGNUP_SUCCESS };
    const outcome = signupReducer(INITIAL_STATE, action);
    expect(outcome).toMatchObject(payload);
  });

  it('returns a state to indicate when the signup request fails', () => {
    const action = {
      type: SIGNUP_FAILURE,
      error: 'email has already taken',
    };
    const payload = { ...INITIAL_STATE, isLoading: false, error: action.error };
    const outcome = signupReducer(INITIAL_STATE, action);
    expect(outcome).toMatchObject(payload);
  });
});
