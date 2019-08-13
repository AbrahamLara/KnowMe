import { GET_MESSAGES, CLEAR_MESSAGES } from "../actions/msg";

const intialState = {
  msg: {},
  status: null,
  id: null
}

export default function msg (state = intialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...action.payload };
    case CLEAR_MESSAGES:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}