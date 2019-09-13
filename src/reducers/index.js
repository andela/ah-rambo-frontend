import { combineReducers } from 'redux';
import loginReducer from './user/login';
import signup from './user/signupReducer';
import resetPassword from './user/resetPassword';
import requestPassword from './user/requestPassword';

export default combineReducers({
  loginReducer,
  signup,
  resetPassword,
  requestPassword
});
