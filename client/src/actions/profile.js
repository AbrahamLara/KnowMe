export const RETRIEVING_PROFILE = 'RETRIEVING_PROFILE';
export const RETRIEVED_PROFILE = 'RETRIEVED_PROFILE';
export const RETRIEVING_PROFILE_FAILED = 'RETRIEVING_PROFILE_FAILED';
export const PROFILE_ACTION = 'PROFILE_ACTION';
export const ADDED_CONTACT_OPTION = 'ADDED_CONTACT_OPTION';
export const UPDATED_CONTACT_OPTION = 'UPDATED_CONTACT_OPTION';
export const REMOVED_CONTACT_OPTION = 'REMOVED_CONTACT_OPTION';
export const PROFILE_ACTION_FAILED = 'PROFILE_ACTION_FAILED';

export function retrievingProfile() {
  return {
    type: RETRIEVING_PROFILE
  }
}

export function retrievedProfile(payload) {
  return {
    type: RETRIEVED_PROFILE,
    payload
  }
}

export function retrievingProfileFailed() {
  return {
    type: RETRIEVING_PROFILE_FAILED
  }
}

export function profileAction() {
  return {
    type: PROFILE_ACTION
  };
}

export function addedContactOption(option) {
  return {
    type: ADDED_CONTACT_OPTION,
    option
  };
}

export function updatedContacOption(payload) {
  return {
    type: UPDATED_CONTACT_OPTION,
    payload
  };
}

export function removedContactOption(optionType) {
  return {
    type: REMOVED_CONTACT_OPTION,
    optionType
  };
}

export function profileActionFailed() {
  return {
    type: PROFILE_ACTION_FAILED
  }
}