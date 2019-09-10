import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../../actionTypes';

const initialState = {
  signedUp: false,
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, isLoading: true };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signedUp: true,
        isLoading: false,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
