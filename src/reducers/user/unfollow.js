import * as actionTypes from '../../actionTypes';

const initialState = {
  status: '', isLoading: false, error: null
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
const unFollowReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UNFOLLOW_REQUEST:
      return {
        state,
        isLoading: true
      };
    case actionTypes.UNFOLLOW_SUCCESS:
      return {
        state,
        status: action.unfollow,
        isLoading: false
      };
    case actionTypes.UNFOLLOW_FAILURE:
      return {
        state,
        isLoading: false,
        error: action.error.message
      };
    default:
      return state;
  }
};

export default unFollowReducer;
