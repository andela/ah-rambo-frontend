import fetchData from '../../helpers/index';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../../actionTypes';

export default (user) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });

  try {
    const { data } = await fetchData('post', '/api/v1/users/create', user);

    localStorage.setItem('token', data.userToken);
    localStorage.setItem('username', data.user.userName);
    dispatch({ type: SIGNUP_SUCCESS });
  } catch (err) {
    const {
      data: { error },
    } = err.response;

    dispatch({
      type: SIGNUP_FAILURE,
      error,
    });
  }
};
