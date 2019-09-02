import {
  AUTHENTICATE_USER,
  DEAUTHENTICATE_USER,
} from '../../actionTypes';

const initialState = {
  isAuthenticated: false
};
export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return { ...state, isAuthenticated: true };
    case DEAUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
