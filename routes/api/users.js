const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// User Model
const User = require('../../models/User');

// @router  GET apli/users
// @desc    Get All users
// @access  Public
router.get('/', (req, res) => {
  User.find()
    .sort({ name: 1 })
    .then(users => res.json(users));
});

// @router  POST apli/users
// @desc    Create new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Simple verification
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields.'});
  }

  // Check for existing users
  User.findOne({ email })
    .then(user => {
      if (user) return res.status.json({ msg: 'User already exists.'});

      const newUser = new User({
        name,
        email,
        password
      });

      // Create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser.save()
            .then(user => {
              res.json({
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              })
            })
            .catch(err => res.status(400).json({  msg: 'Failed to register user.'}));
        });
      });
    });
  
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save()
    .then(user => res.json(user));
});

// @router  DELETE apli/users
// @desc    DELETE a user
// @access  Public
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;