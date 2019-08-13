import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import msg from './msg';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  auth,
  error,
  msg,
  loadingBar: loadingBarReducer
});