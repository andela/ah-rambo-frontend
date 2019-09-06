import { combineReducers } from 'redux';
import validate from './validate';
import user from './user';

export default combineReducers({
  validate,
  user,
});
