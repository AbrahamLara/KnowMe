const express = require('express');
const router = express.Router()
const verifyToken = require('../../middleware/verifyToken');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../../models/User');
const Profile = require('../../models/Profile');

/**
 * @router  GET api/users/user
 * @desc    Get authenticated user data
 * @access  Private
 */
router.get('/user', verifyToken, (req, res) => {
  const id = req.payload.id;

  User.findById(id)
    .select(['-password', '-__v', '-_id'])
    .then(user => {
      Profile.findOne({user_id: ObjectId(id)})
        .then(profile => res.json({
          ...user._doc,
          profile_path: profile.profile_path
        }));
    });
});

/**
 * @router  DELETE api/users/:id
 * @desc    Deletes a user
 * @access  Private
 */
router.delete('/:id', verifyToken, (req, res) => {
  const { payload, params } = req;

  if (payload.id !== params.id) {
    return res.status(401).json({ msg: 'Authorization denided' });
  }

  User.findById(params.id)
    .then(userDoc => {
      Profile.findOne({user_id: ObjectId(params.id)})
        .then(profileDoc => {
          userDoc.remove();
          profileDoc.remove();
          res.json({ success: true })
        });
    })
    .catch(() => res.status(404).json({ success: false }));
});

module.exports = router;