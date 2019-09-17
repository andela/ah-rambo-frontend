import * as types from '../../actionTypes';
import fetchData from '../../helpers';

const followerRequest = () => ({ type: types.USER_FOLLOWER_REQUEST });
const followerSuccess = (follower) => ({ type: types.USER_FOLLOWER_SUCCESS, follower });
const followerFailure = (followerError) => ({ type: types.USER_FOLLOWER_FAILURE, followerError });

const getUserFollower = () => async (dispatch) => {
  dispatch(followerRequest());
  try {
    const { data } = await fetchData('get', '/user/followers');
    console.log('jjjk', data);
    dispatch(followerSuccess(data));
  } catch (e) {
    const followerError = e.response.data;
    dispatch(followerFailure(followerError));
  }
};

export default getUserFollower;
