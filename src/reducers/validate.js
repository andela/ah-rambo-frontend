import * as actionTypes from '../actionTypes';

const initialState = {
  userIsLoading: null,
  isValid: null,
  error: null
};

const validate = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS:
      return {
        ...state,
        userIsLoading: false,
        isValid: true
      };
    case actionTypes.REQUEST:
      return {
        ...state,
        userIsLoading: true,
        isValid: false,
      };
    case actionTypes.FAILURE:
      return {
        ...state,
        userIsLoading: false,
        isValid: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default validate;
