import axios from 'axios';
import {
  REQUEST_PASSWORD_SUCCESS,
  REQUEST_PASSWORD_REQUEST,
  REQUEST_PASSWORD_FAILURE,
} from '../../actionTypes/index';
import http from '../../helpers';

export const requestPasswordLink = () => ({
  type: REQUEST_PASSWORD_REQUEST
});

export const success = (data) => ({
  type: REQUEST_PASSWORD_SUCCESS,
  payload: { ...data }
});

export const failure = (error) => ({
  type: REQUEST_PASSWORD_FAILURE,
  payload: { error: error.message }
});

export const requestPassword = (email) => async (dispatch) => {
  dispatch(requestPasswordLink());
  try {
    const { data } = await http('post',
      '/users/resetpassword', { email });
    dispatch(success(data));
  } catch (err) {
    const { response: { data } } = err;
    dispatch(failure(data));
  }
};

export default requestPassword;
