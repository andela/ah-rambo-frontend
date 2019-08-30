import * as actionTypes from '../actionTypes';

export const ACTION_SUCCESS = () => ({
  type: actionTypes.SUCCESS
});

export const ACTION_REQUEST = () => ({
  type: actionTypes.REQUEST
});
export const ACTION_FAILURE = (error) => ({
  type: actionTypes.FAILURE,
  error
});
