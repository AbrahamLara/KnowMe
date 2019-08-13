import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  STOP_LOADING
} from "../actions/auth";

// For authentication purposes we ge the
// token from localStorage whether it exists
// or not
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  msg: {}
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
      case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
        };
      case REGISTER_SUCCESS:
      case STOP_LOADING:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case REGISTER_FAIL:
        localStorage.removeItem('token');
        
        return {
          token: null,
          isAuthenticated: null,
          isLoading: false,
          user: null
        };
    default:
      return state;
  }
}