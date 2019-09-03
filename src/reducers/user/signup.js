import { USER_SIGNUP } from '../actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP:
      return action.payload;
    default:
      return state;
  }
};
