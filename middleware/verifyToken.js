const decodeToken = require('../utils/helpers').decodeToken;

/**
 * Verifies authorization header token to retrieve payload and
 * add it to the request object. We can make an authorization
 * exception for users who are not logged in but viewing a user's
 * profile.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
function verifyToken(req, res, next) {
  if (req.authorizationException) {
    next();
    return;
  }
  
  const authorization = req.headers.authorization;
  
  if (!authorization) {
    return res.status(401).json({ msg: 'Authorization header required to fulfill request'});
  }

  const token = authorization.replace('KMAT ', '');

  try {
    // Verfiy token
    const decoded = decodeToken(token);
    // Add  decoded payload to request
    req.payload = decoded;

    next();
  } catch (e) {
    res.status(400).json({ msg: 'Failed to verify token'});
  }
}

module.exports = verifyToken;