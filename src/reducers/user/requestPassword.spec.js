import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import requestPasswordReducer from './requestPassword';


const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

const initialState = { isLoading: false };

const data = {
  message: 'Reset password link sent'
};

const error = {
  message: 'Email not found'
}


describe('Request password reducer test', () => {
  it('returns initial state details', () => {
    expect(requestPasswordReducer(undefined, {})).toEqual(initialState);
  })


  it('returns request action', () => {
    const action = {
    type: 'REQUEST_PASSWORD_REQUEST'
  }
    expect(requestPasswordReducer({}, action)).toEqual({ ...initialState,isLoading: true });
  });

  it('returns successful action with payload', () => {
    const action = {
      type: 'REQUEST_PASSWORD_SUCCESS',
      payload: { ...data }
    }
    expect(requestPasswordReducer({}, action)).toEqual({...initialState, 
      ...action.payload,
      isLoading: false,
    });
  });


  it('returns failure action with error payload', () => {
   
    const action = {
      type: 'REQUEST_PASSWORD_FAILURE',
      payload: { ...error.message }
    }
    expect(requestPasswordReducer({}, action)).toEqual({ ...initialState,
      ...action.payload,
      isLoading: false,
    });
  });
})
