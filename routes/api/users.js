const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const { emailConfirmation } = require('../../emailing');

// User Model
const User = require('../../models/User');

/**
 * @router  POST api/users
 * @desc    Create new user
 * @access  Public
 */
router.post('/', (req, res) => {
  const {
    user: {
      first_name,
      last_name,
      email,
      password
    },
    conf_password
  } = req.body;

  // We return a 400 status of there doesn't
  // exist values for the user's first and last
  // name, email, password,and conf_password
  if (!first_name || !last_name || !email || !password || !conf_password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // We compare the user's password inputs to see if they match
  // to produce an error message when they don't
  if (password !== conf_password) {
    return res.status(400).json({ msg: 'Password confirmation failed' })
  }

  // Using the given email we check if there alreay exists
  // a user with the given email. If so we return a 400 status
  // with a message
  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'A user already exists with that email' });

      const newUser = new User({
        first_name,
        last_name,
        email,
        password,
      });

      // All passwords must be hashed and salted before they it 
      // can be stored in in the database along with the rest of
      // the given information
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err1, hash) => {
          if (err1) throw err1;

          newUser.password = hash;
          newUser.save()
            .then(user => {
              // We send the newly registered user an email
              emailConfirmation(user.email, user.first_name.concat(' ', user.last_name), user.id);

              res.status(200).json({ msg: 'Check your email to activate account' });
            })
            .catch(() => res.status(400).json({  msg: 'Failed to register user' }));
        });
      });
    });
});

/**
 * @router  DELETE apli/users
 * @desc    Deletes a user
 * @access  Private
 */
router.delete('/:id', auth, (req, res) => {
  const { user, params } = req;

  if (user.id !== params.id) return res.status(401).json({ msg: 'Authorization denided' });

  User.findById(params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(() => res.status(404).json({ success: false }));
});

module.exports = router;