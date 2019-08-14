import { combineReducers } from 'redux';
import auth from './auth';
import msg from './msg';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  auth,
  msg,
  loadingBar: loadingBarReducer
});