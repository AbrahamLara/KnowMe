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
  stopLoading,
  REGISTER_SUCCESS
} from './auth';
import { getMessages } from './msg';
import { tokenConfig, defaultConfig } from '../utils/helpers';
import { showLoading, hideLoading } from 'react-redux-loading';
import {
  retrievedProfile,
  RETRIEVING_PROFILE_FAILED,
  retrievingProfileFailed 
} from './profile';

// This function is used to load the currently
// authenticated user using their token in order
// authenticate them. If there is no token in the user's
// browser we just dispatch stopLoading and do nothing
export const loadUser = () => (dispatch, getState) => {
  dispatch(showLoading());
  dispatch(userLoading());
  const config = tokenConfig(getState);

  if (!config.headers['Authorization']) {
    dispatch(stopLoading());
    dispatch(hideLoading());
    return;
  }

  axios.get('/api/users/user', config)
    .then(res => {
      dispatch(userLoaded(res.data));
      dispatch(hideLoading());
    })
    .catch(({ response }) => {
      dispatch(getMessages(response.data, response.status));
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

  axios.post('/api/auth/register', body, config)
    .then(res => {
      dispatch(registerSuccess(res.data));
      dispatch(getMessages(res.data, res.status, REGISTER_SUCCESS));
      dispatch(hideLoading());
    })
    .catch(({ response }) => {
      dispatch(registerFail());
      dispatch(getMessages(response.data, response.status, REGISTER_FAIL));
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
    .catch(({ response }) => {
      dispatch(loginFail());
      dispatch(getMessages(response.data, response.status, LOGIN_FAIL));
      dispatch(hideLoading());
    });
}

// This method takes a token as the parameter and that will contain
// the newly registered user's email to activate their account.
export const activate = (token) => dispatch => {
  dispatch(showLoading());
  
  return axios.put('/api/auth/activate', {
    confirmation: token
  })
    .then(res => {
      dispatch(hideLoading());
      return {
        msg: res.data.msg
      };
    })
    .catch(({ response }) => {
      dispatch(hideLoading());
      return {
        msg: response.data.msg,
        error: true
      };
    });
}

// This method is used to retreive the profile page of the user who
// owns the given profile path.
export const getUserProfile = (profilePath) => (dispatch, getState) => {
  dispatch(showLoading());

  const config = tokenConfig(getState);

  return axios.get(`/api/profile/${profilePath}`, config)
    .then(res => {
      dispatch(retrievedProfile(res.data.profile));
      dispatch(hideLoading());
    })
    .catch(({ response }) => {
      dispatch(retrievingProfileFailed());
      dispatch(getMessages(
        response.data,
        response.status,
        RETRIEVING_PROFILE_FAILED
      ));
      dispatch(hideLoading());
    });
}