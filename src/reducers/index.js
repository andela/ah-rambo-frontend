import { combineReducers } from 'redux';
import loginReducer from './user/login';
import signup from './user/signupReducer';

export default combineReducers({
  loginReducer,
  signup,
});
