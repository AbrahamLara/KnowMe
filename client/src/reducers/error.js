import { GET_ERRORS, CLEAR_ERRORS } from "../actions/error";

const intialState = {
  msg: {},
  status: null,
  id: null
}

export default function error (state = intialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return { ...action.payload };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}