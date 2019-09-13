import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from '../../actionTypes';

const initialState = {
  userData: {},
  userLoading: false,
  userError: null
};
export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, userLoading: true };
    case GET_USER_SUCCESS:
      return { ...state, userData: action.user, userLoading: false };
    case GET_USER_FAILURE:
      return { ...state, userError: action.userError, userLoading: false };
    default:
      return state;
  }
};
