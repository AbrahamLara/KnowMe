const User = require('../models/User');

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