import * as actionTypes from '../../actionTypes';
import fetchData from '../../helpers/index';


export const request = () => ({ type: actionTypes.LOGIN_REQUEST });
export const success = (user) => ({ type: actionTypes.LOGIN_SUCCESS, user });
export const failure = (error) => ({ type: actionTypes.LOGIN_FAILURE, error });

export const login = (userLogin, password) => async (dispatch) => {
  dispatch(request({ userLogin, password }));
  try {
    const { data } = await fetchData('post', '/api/v1/sessions/create', { userLogin, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.user.userName);
    dispatch(success(data));
  } catch (err) {
    const { data: error } = err.response;
    dispatch(failure(error));
  }
};
