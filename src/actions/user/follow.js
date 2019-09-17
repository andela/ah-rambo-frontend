import * as actionTypes from '../../actionTypes';
import fetchData from '../../helpers/index';


export const request = () => ({ type: actionTypes.FOLLOW_REQUEST });
export const success = (follow) => ({ type: actionTypes.FOLLOW_SUCCESS, follow });
export const failure = (error) => ({ type: actionTypes.FOLLOW_FAILURE, error });

export const follow = (userName) => async (dispatch) => {
  dispatch(request(follow));
  try {
    await fetchData('post', `/api/v1/profiles/${userName}/follow`);
    dispatch(success('followed'));
  } catch (err) {
    const { data: error } = err.response;
    dispatch(failure(error));
  }
};
