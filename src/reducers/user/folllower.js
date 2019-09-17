import {
  USER_FOLLOWER_REQUEST,
  USER_FOLLOWER_SUCCESS,
  USER_FOLLOWER_FAILURE
} from '../../actionTypes';

const initialState = {
  followerData: {},
  followerLoading: false,
  followerError: null
};
const followerReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case USER_FOLLOWER_REQUEST:
      return { ...state, followerLoading: true };
    case USER_FOLLOWER_SUCCESS:
      return {
        ...state,
        followerLoading: false,
        followerData: action.follower
      };
    case USER_FOLLOWER_FAILURE:
      return {
        ...state,
        followerLoading: false,
        followerError: action.followerError
      };
    default:
      return state;
  }
};

export default followerReducer;
