import { GET_USER_PROFILE } from '../../actionTypes';
import userReducer from './';

describe('User Reducer', () => {
  it('returns default state', () => {
    expect(userReducer(null, {})).toEqual(null);
  });

  it('returns user details when GET_USER_PROFILE action is dispatched', () => {
    const user = {
      firstName: 'Jay',
      lastName: 'Zee',
      username: 'jayzee101',
    };
    const action = {
      type: GET_USER_PROFILE,
      payload: user,
    };
    const newState = userReducer(null, action);
    expect(newState).toEqual(user);
  });
});
