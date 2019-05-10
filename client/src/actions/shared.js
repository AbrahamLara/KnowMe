import axios from 'axios';
import {
  REGISTER_FAIL,
  userLoading,
  userLoaded,
  authError,
  registerSuccess,
  registerFail,
  loginSuccess,
  loginFail,
  LOGIN_FAIL,
  stopLoading
} from './auth';
import { getErrors } from './error'
import { tokenConfig, defaultConfig } from '../utils/helpers';
import { showLoading, hideLoading } from 'react-redux-loading';

// This function is used to load the currently
// authenticated user using their token in order
// authenticate them. If there is no token in the user's
// browser we just dispatch stopLoading and do nothing
export const loadUser = () => (dispatch, getState) => {
  dispatch(showLoading());
  dispatch(userLoading());
  const config = tokenConfig(getState);

  if (!config.headers['x-auth-token']) {
    dispatch(stopLoading());
    dispatch(hideLoading());
    return;
  }

  axios.get('/api/auth/user', config)
    .then(res => {
      dispatch(userLoaded(res.data));
      dispatch(hideLoading());
    })
    .catch(err => {
      dispatch(getErrors(err.response.data, err.response.status));
      dispatch(authError());
      dispatch(hideLoading());
    });
}

// We take the user's inputs and put them in an object that is
// then stringified to be sent as data to complete post
// request at the given path so that the user may be registered
// in the database
export const register = ({ first_name, last_name, email, password }, conf_password) => dispatch => {
  dispatch(showLoading());
  const config = defaultConfig();

  const body = JSON.stringify({
    user: {
      first_name,
      last_name,
      email,
      password
    },
    conf_password
  });

  axios.post('/api/users', body, config)
    .then(res => {
      dispatch(registerSuccess(res.data));
      dispatch(hideLoading());
    })
    .catch(({ response }) => {
      dispatch(registerFail());
      dispatch(getErrors(response.data, response.status, REGISTER_FAIL));
      dispatch(hideLoading());
    });
}

// We take the user's inputs and put them in an object that is
// then stringified to be sent as data to complete post
// request at the given path so that the user's token may be generated
// to allow for authorization so that the user may start using the platform
export const login = ({ email, password }) => dispatch => {
  dispatch(showLoading());
  const config = defaultConfig();

  const body = JSON.stringify({ email, password });

  axios.post('/api/auth', body, config)
    .then(res => {
      dispatch(loginSuccess(res.data));
      dispatch(hideLoading());
    })
    .catch(err => {
      dispatch(loginFail());
      dispatch(getErrors(err.response.data, err.response.status, LOGIN_FAIL));
      dispatch(hideLoading());
    });
}