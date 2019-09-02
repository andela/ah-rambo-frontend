import * as actionTypes from '../../actionTypes';
import fetchData from '../../helpers';
import { setToStorage } from '../../helpers/storageHelper';

export const request = () => ({ type: actionTypes.LOGIN_REQUEST });
export const success = (user) => ({ type: actionTypes.LOGIN_SUCCESS, user });
export const failure = (error) => ({ type: actionTypes.LOGIN_FAILURE, error });

export const login = (userLogin, password) => async (dispatch) => {
  dispatch(request({ userLogin, password }));
  try {
    const { data } = await fetchData('post', '/sessions/create', { userLogin, password });
    setToStorage({ token: data.token, username: data.user.userName });
    dispatch(success(data));
  } catch (err) {
    const { data: error } = err.response;
    dispatch(failure(error));
  }
};
