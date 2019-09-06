import axios from 'axios';
import { GET_USER_PROFILE } from '../../actionTypes';

export default () => async (dispatch) => {
  const response = await axios.get('https://api.myjson.com/bins/1d8puv');
  dispatch({
    type: GET_USER_PROFILE,
    payload: response.data,
  });
};
