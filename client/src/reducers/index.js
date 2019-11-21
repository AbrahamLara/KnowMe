import { combineReducers } from 'redux';
import auth from './auth';
import msg from './msg';
import profile from './profile';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  auth,
  msg,
  profile,
  loadingBar: loadingBarReducer
});