const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const verify = require('../../middleware/verify');
const { generateToken } = require('../../utils/helpers');

// User Model
const User = require('../../models/User');

/**
 * @router  POST api/auth
 * @desc    Authenticate user
 * @access  Public
 */
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
      if (!user.account_activated) return res.status(400).json({ msg: 'Account is not activated' });;

      // We compare the given password with the exsiting user's
      // hashed password to check for a match. Assuming they match
      // we sign a json web token for the user to keep in localStorage
      // and successfully respond with essential user information and the token
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
          if (!user.account_activated) res.status(400).json({ msg: 'Account is not activated' });
          
          // We include the user's id in the token so that when it gets decoded
          // we can authenticated and give the user permission access their own content
          // and fulfill certain actions with their content
          generateToken({ id: user.id }, { expiresIn: 30 })
            .then(token => {
              res.json({
                token,
                user: {
                  id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email
                }
              });
            });
        });
    });
});

/**
 * @router  GET api/auth/activate
 * @desc    Activates user account
 * @access  Private
 */
router.get('/activate', (req, res) => {
  const token = req.query.confirmation;
  
  try {
    const { id } = jwt.verify(token, config.get('jwtSecret'));
    
    User.findById(id)
    .then(user => {
      if (!user)
        return res.status(400).json({ msg: 'User account doesn\'t exist.'});;
      if (user.account_activated)
        return res.status(400).json({ msg: 'User account already activated. Click the login button at the top right to access your account.'});

      user.account_activated = true;
      user.save();
      
      res.status(200).json({ msg: 'You have successfully activated your account. Hit the login button at the top right to access your account.' });
      });
  } catch (e) {
    res.status(400).json({ msg: 'Failed to verify confirmation token.'});
  }
});

/**
 * @router  GET api/auth/user
 * @desc    Get authenticated user data
 * @access  Private
 */
router.get('/user', auth, verify, (req, res) => {
  User.findById(req.user.id)
    .select(['-password', '-__v'])
    .then(user => res.json(user));
});

module.exports = router;