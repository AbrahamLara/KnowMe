export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = 'USER_LOADED';
export const STOP_LOADING = 'STOP_LOADING';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export function userLoading () {
  return {
    type: USER_LOADING
  };
}

export function userLoaded (payload) {
  return {
    type: USER_LOADED,
    payload
  };
}

export function stopLoading() {
  return {
    type: STOP_LOADING
  }
}

export function authError () {
  return {
    type: AUTH_ERROR
  };
}

export function loginSuccess (payload) {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
}

export function loginFail () {
  return {
    type: LOGIN_FAIL
  }
}

export function logoutSuccess () {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function registerSuccess (payload) {
  return {
    type: REGISTER_SUCCESS,
    payload
  };
}

export function registerFail () {
  return {
    type: REGISTER_FAIL,
  };
}

// It's only purpose is to remove the
// user's token from localStorage and reset
// auth state in redux store
export function logout () {
  return logoutSuccess();
}