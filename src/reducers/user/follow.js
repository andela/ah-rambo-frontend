import * as actionTypes from '../../actionTypes';

const initialState = {
  follow: {}, isLoading: false, error: null
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
const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FOLLOW_REQUEST:
      return {
        state,
        isLoading: true
      };
    case actionTypes.FOLLOW_SUCCESS:
      return {
        state,
        follow: action,
        isLoading: false
      };
    case actionTypes.FOLLOW_FAILURE:
      return {
        state,
        isLoading: false,
        error: action.error.message
      };
    default:
      return state;
  }
};

export default followReducer;
