import axios from 'axios';
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
} from '../../actionTypes';

const LOCALHOST_BASE_URL = 'http://localhost:9000/api/v1';
// const HEROKU_BASE_URL =
//   'https://authors-haven-development.herokuapp.com/api/v1';

export default (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });

  try {
    const { data } = await axios.post(
      `${LOCALHOST_BASE_URL}/users/create`,
      user
    );

    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.user.userName);
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
  } catch (err) {
    const {
      data: { error },
    } = err.response;

    dispatch({
      type: USER_SIGNUP_FAILURE,
      payload: error,
    });
  }
};
