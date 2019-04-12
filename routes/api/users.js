const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @router  GET apli/users
// @desc    Get all user info
// @access  Public
router.get('/', (req, res) => {
  User.find()
    .select('-password')
    .sort({ name: 1 })
    .then(users => res.json(users));
});

// @router  POST api/users
// @desc    Create new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // We return a 400 status of there doesn't
  // exist values for name, email, password
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields'});
  }

  // Using the given email we check if there alreay exists
  // a user with the given email. If so we return a 400 status
  // with a message
  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'User already exists'});

      const newUser = new User({
        name,
        email,
        password
      });

      // All passwords must be hashed and salted before they it 
      // can be stored in in the database along with the rest of
      // the given information
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser.save()
            .then(user => {
              res.json({ msg: 'Successfully registered user'});
            })
            .catch(err => res.status(400).json({  msg: 'Failed to register user'}));
        });
      });
    });
});

// @router  DELETE apli/users
// @desc    Deletes a user
// @access  Private
router.delete('/:id', auth, (req, res) => {
  const { user, params } = req;

  if (user.id !== params.id) return res.status(401).json({ msg: 'Authorization denided'});

  User.findById(params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;