const express = require('express');
const router = express.Router()
const auth = require('../../middleware/auth');
const verify = require('../../middleware/verify');
const ObjectId = require('mongoose').Types.ObjectId;

// User Model
const User = require('../../models/User');
const Profile = require('../../models/Profile');

/**
 * @router  GET api/users/user
 * @desc    Get authenticated user data
 * @access  Private
 */
router.get('/user', auth, verify, (req, res) => {
  User.findById(req.user.id)
    .select(['-password', '-__v'])
    .then(user => res.json(user));
});

/**
 * @router  DELETE api/users/:id
 * @param   id
 * @desc    Deletes a user
 * @access  Private
 */
router.delete('/:id', auth, (req, res) => {
  const { user, params } = req;

  if (user.id !== params.id) return res.status(401).json({ msg: 'Authorization denided' });

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