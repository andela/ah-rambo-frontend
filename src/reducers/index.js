import { combineReducers } from 'redux';
import loginReducer from './user/login';
import signup from './user/signupReducer';
import resetPassword from './user/resetPassword';
import requestPassword from './user/requestPassword';
import postComment from './comment/postComments';
import readArticle from './article';

export default combineReducers({
  loginReducer,
  signup,
  resetPassword,
  requestPassword,
  postComment,
  readArticle
});
