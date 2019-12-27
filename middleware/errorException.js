/**
 * This adds status error exceptions for routes
 * that don't need to be send a response with
 * an error status.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
function authException(req, res, next) {
  req.errorException = true;
  next();
}

module.exports = authException;