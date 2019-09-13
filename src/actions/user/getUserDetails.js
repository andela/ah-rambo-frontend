import axios from 'axios';
import * as types from '../../actionTypes';
import fetchData from '../../helpers';

const userRequest = () => ({ type: types.GET_USER_REQUEST });
const userSuccess = (user) => ({ type: types.GET_USER_SUCCESS, user });
const userFailure = (userError) => ({ type: types.GET_USER_FAILURE, userError });
const getUserDetails = () => async (dispatch) => {
  dispatch(userRequest());
  try {
    const userName = localStorage.getItem('username');
    const userUrl = `/profiles/${userName}`;
    const response = await fetchData('get', userUrl, {});
    const { user } = response.data;
    dispatch(userSuccess(user));
  } catch (e) {
    const userError = e.response.data;
    dispatch(userFailure(userError));
  }
};

export default getUserDetails;
