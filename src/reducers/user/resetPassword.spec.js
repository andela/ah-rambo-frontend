import resetPasswordReducer from './resetPassword';

const initialState = { isLoading: false };

const data = {
  message: 'Password reset successfully'
};

const error = {
  error: 'Link has been used or expired'
}


describe('Reset password reducer test', () => {
  it('returns initial state details', () => {
    expect(resetPasswordReducer(undefined, {})).toEqual(initialState);
  })


  it('returns request action', () => {
    const action = {
    type: 'RESET_PASSWORD_REQUEST',
    payload: {}
  }
    expect(resetPasswordReducer({}, action)).toEqual({ ...initialState,isLoading: true });
  });

  it('returns successful action with payload', () => {
    const action = {
      type: 'RESET_PASSWORD_SUCCESS',
      payload: { ...data }
    }
    expect(resetPasswordReducer({}, action)).toEqual({...initialState, 
      ...action.payload,
      isLoading: false,
    });
  });


  it('returns failure action with error payload', () => {
    const action = {
      type: 'RESET_PASSWORD_FAILURE',
      payload: { error: error.error }
    }
    expect(resetPasswordReducer({}, action)).toEqual({ ...initialState,
      ...action.payload,
      isLoading: false,
    });
  });
})
