export const GET_MESSAGES = 'GET_MESSAGES';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export function getMessages (msg, status, id = null) {
  return {
    type: GET_MESSAGES,
    payload: { msg, status, id }
  };
}

export function clearMessages () {
  return {
    type: CLEAR_MESSAGES
  };
}