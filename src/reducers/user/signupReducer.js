import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
} from '../../actionTypes';

const initialState = {
  signedUp: false,
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { ...state, isLoading: true };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        signedUp: true,
        isLoading: false,
        error: null,
      };
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
