import httpClient from '../../helpers/index';
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
} from '../../actionTypes';

export default (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });

  try {
    const { data } = await httpClient('post', '/api/v1/users/create', user);

    localStorage.setItem('token', data.userToken);
    localStorage.setItem('username', data.user.userName);
    dispatch({ type: USER_SIGNUP_SUCCESS });
  } catch (err) {
    const {
      data: { error },
    } = err.response;

    dispatch({
      type: USER_SIGNUP_FAILURE,
      error,
    });
  }
};
