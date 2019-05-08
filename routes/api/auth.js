const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const verify = require('../../middleware/verify');

// User Model
const User = require('../../models/User');

// @router  POST api/auth
// @desc    Authenticate user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // We return a 400 status of there doesn't
  // exist values for either email or password
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Using the given email we check if an existing user
  // has registered with the given email. If no user exists
  // with the provided email we return a 400 status with
  // a message
  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      // We compare the given password with the exsiting user's
      // hashed password to check for a match. Assuming they match
      // we sign a json web token for the user to keep in localStorage
      // and successfully respond with essential user information and the token
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
          
          // We include the user's id in the token so that when it gets decoded
          // we can authenticated and give the user permission access their own content
          // and fulfill certain actions with their content
          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 30 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
    });
});

// @router  GET api/auth/user
// @desc    Get authenticated user data
// @access  Private
router.get('/user', auth, verify, (req, res) => {
  User.findById(req.user.id)
    .select(['-password', '-__v'])
    .then(user => res.json(user));
});

module.exports = router;