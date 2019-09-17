import * as types from '../../actionTypes';
import fetchData from '../../helpers';

const followingRequest = () => ({ type: types.USER_FOLLOWING_REQUEST });
const followingSuccess = (following) => ({ type: types.USER_FOLLOWING_SUCCESS, following });
const followingFailure = (followingError) => ({ type: types.USER_FOLLOWING_FAILURE, followingError });

const getUserFollowing = () => async (dispatch) => {
  dispatch(followingRequest());
  try {
    const { data } = await fetchData('get', '/user/followings');
    dispatch(followingSuccess(data));
  } catch (e) {
    const followingError = e.response.data;
    dispatch(followingFailure(followingError));
  }
};

export default getUserFollowing;
