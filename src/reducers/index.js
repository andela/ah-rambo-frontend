import { combineReducers } from 'redux';
import validate from './validate';
import user from './user/userProfile';
import loginReducer from './user/login';

export default combineReducers({
  validate,
  user,
  loginReducer
});
