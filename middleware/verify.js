const User = require('../models/User');

// After verifying the token has been successful this middleware
// will make sure the currently logged in case the user has deleted
// their account in which case we prevent authentication
function verify (req, res, next) {
  User.findById(req.user.id, (err, data) => {
    if (data) {
      next();
    } else {
      res.status(404).json({ msg: 'User does not exist'});
    }
  });
}

module.exports = verify