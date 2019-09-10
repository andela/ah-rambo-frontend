import * as actionTypes from '../../actionTypes';

const initialState = {
  user: {}, isLoading: false, error: null
};

/**
 * users reducer to return user data
 *
 * @param {state} state - initial state object
 * @param {action} action - action creator
 * @param {action.types} action.types - action type
 *
 * @return {object} - new state object
 */
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        state,
        isLoading: true
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        state,
        user: action,
        isLoading: false
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        state,
        isLoading: false,
        error: action.error.message
      };
    default:
      return state;
  }
};

export default loginReducer;
