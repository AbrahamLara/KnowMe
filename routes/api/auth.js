const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const config = require('config');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../../utils/helpers');
const { emailConfirmation } = require('../../emailing');
const ObjectId = require('mongoose').Types.ObjectId;

// User Model
const User = require('../../models/User');
const Profile = require('../../models/Profile');

/**
 * @router  POST api/auth/register
 * @desc    Create new user
 * @access  Public
 */
router.post('/register', (req, res) => {
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
        password
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
              const newProfile = new Profile({
                user_id: ObjectId(user.id),
                profile_path: uuidv4(),
                contact_options: {email: {type: 'email', value: user.email}}
              });
              
              newProfile.save()
                .then(() => {
                  // We send the newly registered user an email
                  emailConfirmation(user.email, user.first_name.concat(' ', user.last_name), user.id);
    
                  res.status(200).json({ msg: 'Check your email to activate account' });
                });
            })
            .catch(() => {
              newUser.remove();
              res.status(400).json({ msg: 'Failed to register user' })
            });
        });
      });
    });
});

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
          
          Profile.findOne({ user_id: user.id })
            .then(profile => {
              const { first_name, last_name, email } = user;
              const profile_path = profile.profile_path;
              
              // We include the user's id in the token so that when it gets decoded
              // we can authenticated and give the user permission access their own content
              // and fulfill certain actions with their content
              generateToken({ id: user.id })
                .then(token => {
                  res.json({
                    token,
                    user: {
                      first_name,
                      last_name,
                      email,
                      profile_path
                    }
                  });
                });
            });
        });
    });
});

/**
 * @router  PUT api/auth/activate
 * @desc    Activates user account
 * @access  Private
 */
router.put('/activate', (req, res) => {
  const token = req.body.confirmation;
  
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

module.exports = router;