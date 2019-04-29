import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  auth,
  error,
  loadingBar: loadingBarReducer
});