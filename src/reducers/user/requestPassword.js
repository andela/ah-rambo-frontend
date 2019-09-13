import {
  REQUEST_PASSWORD_SUCCESS,
  REQUEST_PASSWORD_REQUEST,
  REQUEST_PASSWORD_FAILURE
} from '../../actionTypes/index';

const initialState = { isLoading: false };


export default (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_PASSWORD_REQUEST:
    return {
      isLoading: true
    };

  case REQUEST_PASSWORD_SUCCESS:
    return {
      ...action.payload,
      isLoading: false,
    };

  case REQUEST_PASSWORD_FAILURE:
    return {
      ...action.payload,
      isLoading: false,
    };
  default:
    return state;
  }
};
