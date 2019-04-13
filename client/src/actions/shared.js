import axios from 'axios';
import {
  REGISTER_FAIL,
  userLoading,
  userLoaded,
  authError,
  registerSuccess,
  registerFail
} from './auth';
import { getErrors } from './error'
import { tokenConfig, defaultConfig } from '../utils/helpers';

// This function is used to load the currently
// authenticated user using their token in order
// authenticate them
export const loadUser = () => (dispatch, getState) => {
  // Loading the user
  dispatch(userLoading());

  return axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => dispatch(userLoaded(res.data)))
    .catch(err => {
      dispatch(getErrors(err.response.data, err.response.status));
      dispatch(authError())
    });
}

// We take the user's inputs put then in an object that is
// then stringified to be sent as data to complete post
// request at the given path so that the user may be registered
// in the database
export const register = ({ name, email, password }) => dispatch => {
  const config = defaultConfig();

  const body = JSON.stringify({ name, email, password });

  axios.post('/api/users', body, config)
    .then(res => dispatch(registerSuccess(res.data)))
    .catch(err => {
      dispatch(registerFail());
      dispatch(getErrors(err.response.data, err.response.status, REGISTER_FAIL));
    });
}