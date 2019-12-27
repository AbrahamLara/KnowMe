/**
 * This adds status error exceptions for routes
 * that don't need to be sent a response with
 * an error message.
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