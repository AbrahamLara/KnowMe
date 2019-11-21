export const RETRIEVING_PROFILE = 'RETRIEVING_PROFILE';
export const RETRIEVED_PROFILE = 'RETRIEVED_PROFILE';
export const RETRIEVING_PROFILE_FAILED = 'RETRIEVING_PROFILE_FAILED';

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