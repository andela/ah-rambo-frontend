import { combineReducers } from 'redux';
import loginReducer from './user/login';
import signup from './user/signupReducer';
import resetPassword from './user/resetPassword';
import requestPassword from './user/requestPassword';
import article from './article/article';
import user from './user/user';
import auth from './auth';

export default combineReducers({
  loginReducer,
  signup,
  resetPassword,
  requestPassword,
  user,
  article,
  auth
});
