import fetchData from '../../helpers/index';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../../actionTypes';
import { setToStorage } from '../../helpers/storageHelper';

export default user => async dispatch => {
  dispatch({ type: SIGNUP_REQUEST });

  try {
    const { data } = await fetchData('post', '/users/create', user);
    setToStorage({ token: data.token, username: data.user.userName });

    dispatch({ type: SIGNUP_SUCCESS });
  } catch (err) {
    const {
      data: { error }
    } = err.response;

    dispatch({
      type: SIGNUP_FAILURE,
      error
    });
  }
};
