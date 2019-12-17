const config = require('config');
const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');
const ObjectId = require('mongoose').Types.ObjectId;

// This piece of middleware checks is the requested
// profile page is being requested by the owner in
// order to allow for editable functionality.
async function profile (req, res, next) {
  req.extras = {};

  const authorization = req.headers.authorization;
  
  if (!authorization) return next();

  const token = authorization.replace('KMAT ', '');

  try {
    // Get Id
    const userId = jwt.verify(token, config.get('jwtSecret')).id;
    
    await Profile.findOne({user_id: ObjectId(userId)}, (err, profile) => {
      if (profile && (profile.profile_path === req.params.profilePath)) {
        req.extras.owner = true;
      }
    });
    next();
  } catch (e) {
    next();
  }
}

module.exports = profile;