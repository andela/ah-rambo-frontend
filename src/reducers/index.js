import { combineReducers } from 'redux';
import loginReducer from './user/login';
import signup from './user/signup';
import signupStatus from './signupStatus';

export default combineReducers({
  loginReducer,
  signup,
  signupStatus,
});
