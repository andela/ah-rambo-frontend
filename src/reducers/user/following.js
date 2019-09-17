import {
  USER_FOLLOWING_REQUEST,
  USER_FOLLOWING_SUCCESS,
  USER_FOLLOWING_FAILURE
} from '../../actionTypes';

const initialState = {
  followingData: {},
  followingLoading: false,
  followingError: null
};
const followingReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case USER_FOLLOWING_REQUEST:
      return { ...state, followingLoading: true };
    case USER_FOLLOWING_SUCCESS:
      return {
        ...state,
        followingLoading: false,
        followingData: action.following
      };
    case USER_FOLLOWING_FAILURE:
      return {
        ...state,
        followingLoading: false,
        followingError: action.followingError
      };
    default:
      return state;
  }
};

export default followingReducer;
