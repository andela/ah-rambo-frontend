import http from '../../helpers';
import {
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS
} from '../../actionTypes/index';

export const resetPassword = () => ({
  type: RESET_PASSWORD_REQUEST
});

export const success = (payload) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload
});

export const failure = (error) => ({
  type: RESET_PASSWORD_FAILURE,
  payload: { error: error.error }
});

export const resetPasswordAction = (body, passwordResetToken) => async (dispatch) => {
  dispatch(resetPassword());
  try {
    const { data } = await http('patch', `/users/resetpassword/${passwordResetToken}`, body);
    dispatch(success(data));
  } catch (err) {
    const { response: { data } } = err;
    dispatch(failure(data));
  }
};

export default resetPasswordAction;
