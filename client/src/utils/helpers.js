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
    config.headers['x-auth-token'] = token;
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

// Combines className of type string with the given classes.
// However, if no classes are given then it just returns className
// to prevent having a whitespace at the end of a class name.
export function combineClassNames (className, classes='') {
  if (!classes) return className;

  return className.concat(' ', classes);
}