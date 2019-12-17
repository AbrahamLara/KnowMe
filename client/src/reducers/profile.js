import {
  RETRIEVING_PROFILE,
  RETRIEVED_PROFILE,
  RETRIEVING_PROFILE_FAILED,
  ADDED_CONTACT_OPTION,
  REMOVED_CONTACT_OPTION,
  UPDATED_CONTACT_OPTION,
  PROFILE_ACTION,
  PROFILE_ACTION_FAILED
} from '../actions/profile';

const initialstate = {
  first_name: '',
  last_name: '',
  email_name: '',
  sections: [],
  contact_options: {},
  profile_path: ''
}

export default function profile(state = initialstate, action) {
  switch(action.type) {
    case RETRIEVED_PROFILE:
      const payload = action.payload;

      return {
        ...payload
      };
    case ADDED_CONTACT_OPTION:
      const contact_options = state.contact_options;
      const option = action.option;
      
      return {
        ...state,
        contact_options: {
          ...contact_options,
          ...option
        }
      };
    case UPDATED_CONTACT_OPTION:
      const { type, value } = action.payload;
      const options = state.contact_options;
      options[type] = {...options[type], value};
      
      return {
        ...state,
        contact_options: { ...options }
      };
    case REMOVED_CONTACT_OPTION:
      const optionType = action.optionType;
      const { [optionType]: val, ...rest } = state.contact_options;

      return {
        ...state,
        contact_options: { ...rest }
      };
    case RETRIEVING_PROFILE_FAILED:
    case RETRIEVING_PROFILE:
    case PROFILE_ACTION:
    case PROFILE_ACTION_FAILED:
    default:
      return state;
  }
}