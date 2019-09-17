import { combineReducers } from 'redux';
import loginReducer from './user/login';
import signup from './user/signupReducer';
import resetPassword from './user/resetPassword';
import requestPassword from './user/requestPassword';
import followerReducer from './user/folllower';
import followingReducer from './user/following';
import unFollowReducer from './user/unfollow';
import followReducer from './user/follow';

export default combineReducers({
  loginReducer,
  signup,
  resetPassword,
  requestPassword,
  followerReducer,
  followingReducer,
  unFollowReducer,
  followReducer
});
