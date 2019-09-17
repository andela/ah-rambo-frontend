import * as actionTypes from '../../actionTypes';
import fetchData from '../../helpers/index';


export const request = () => ({ type: actionTypes.UNFOLLOW_REQUEST });
export const success = (unfollow) => ({ type: actionTypes.UNFOLLOW_SUCCESS, unfollow });
export const failure = (error) => ({ type: actionTypes.UNFOLLOW_FAILURE, error });

export const unfollow = (userName) => async (dispatch) => {
  dispatch(request(unfollow));
  try {
    await fetchData('delete', `/api/v1/profiles/${userName}/follow`);
    dispatch(success('unfollowed'));
  } catch (err) {
    const { data: error } = err.response;
    dispatch(failure(error));
  }
};
