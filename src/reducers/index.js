import { combineReducers } from 'redux';
import loginReducer from './user/login';
import signup from './user/signup';

export default combineReducers({
  loginReducer,
  signup,
});
