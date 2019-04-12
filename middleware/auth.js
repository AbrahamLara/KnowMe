const config = require('config');
const jwt = require('jsonwebtoken');

// Before a user can be authenticated we check for an existing
// token in the request header. If the token does not exist we
// return a 401 status with a message. If a token is given we
// first verify it using the jwtSecret. Once succesful we add
// the decoded user data to the request object then move onto
// the next middleware.
function auth (req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verfiy token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add  user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid'});
  }
}

module.exports = auth;