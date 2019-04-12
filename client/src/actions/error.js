export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export function getErrors (msg, status, id = null) {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
}

export function clearErrors () {
  return {
    type: CLEAR_ERRORS
  };
}