/**
 * This adds authorization exceptions for routes
 * that don't necessarily need an authed user so
 * we can decode their token as non authed users
 * don't have tokens.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
function authException(req, res, next) {
  req.authorizationException = !Boolean(req.headers.authorization);
  next();
}

module.exports = authException;