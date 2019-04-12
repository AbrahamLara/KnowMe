import axios from 'axios';
import { userLoading, userLoaded, authError } from './auth';
import { getErrors } from './error'
import { tokenConfig } from '../utils/helpers';

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