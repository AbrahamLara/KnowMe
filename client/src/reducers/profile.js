import { RETRIEVING_PROFILE, RETRIEVED_PROFILE, RETRIEVING_PROFILE_FAILED } from "../actions/profile";

const initialstate = {
  first_name: '',
  last_name: '',
  email_name: '',
  sections: [],
  contact_options: []
}

export default function profile(state = initialstate, action) {
  switch(action.type) {
    case RETRIEVED_PROFILE:
      const payload = action.payload;

      return {
        ...payload
      };
    case RETRIEVING_PROFILE_FAILED:
    case RETRIEVING_PROFILE:
    default:
      return state;
  }
}