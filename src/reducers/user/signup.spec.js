import signupReducer from '../../reducers/signupStatus';
import { USER_SIGNUP } from '../../actionTypes';

describe('Signup Reducer', () => {
  it('returns initial state when no action is dispatched', () => {
    const initialState = {};
    const outcome = signupReducer(initialState, {});
    expect(outcome).toBe(initialState);
  });

  it('returns a state to indicate when the signup request is ongoing', () => {
    const initialState = {};
    const payload = { status: 'processing' };
    const action = { type: USER_SIGNUP, payload };
    const outcome = signupReducer(initialState, action);
    expect(outcome).toEqual(payload);
  });

  it('returns a state to indicate when the signup request is completed', () => {
    const initialState = {};
    const payload = { status: 'completed' };
    const action = { type: USER_SIGNUP, payload };
    const outcome = signupReducer(initialState, action);
    expect(outcome).toEqual(payload);
  });

  it('returns a state to indicate when the signup request fails', () => {
    const initialState = {};
    const payload = { status: 'failed' };
    const action = { type: USER_SIGNUP, payload };
    const outcome = signupReducer(initialState, action);
    expect(outcome).toEqual(payload);
  });
});
