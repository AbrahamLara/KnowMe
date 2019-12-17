// If a token needs to be sent to a certain endpoint this
// function erturn the headers with the token included if
// one exists in a user's localStorage
export const tokenConfig = getState => {
  // Get token from localStorage
  let token = getState().auth.token;
  // Headers configuration
  const config = defaultConfig();

  // If token exists, then add it to headers
  if (token) {
    config.headers['Authorization'] = 'KMAT ' + token;
  }

  return config;
}

// Default headers configuration
export function defaultConfig () {
  return {
    headers: {
      'Content-Type': 'application/json'
    }
  };
}