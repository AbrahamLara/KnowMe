const express = require('express');
const router = express.Router();
const profileExtras = require('../../middleware/profile');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

/**
 * @router  GET api/profile/:profilePath
 * @param   profilePath
 * @desc    Gets user profile to load on know page
 * @access  Public
 */
router.get('/:profilePath', profileExtras, (req, res) => {
  const extras = req.extras;
  const profile_path = req.params.profilePath;

  User.findOne({
    profile_path
  })
  .then(user => {
    const {
      profileId,
      first_name,
      last_name,
      email
    } = user;

    Profile.findById(profileId)
      .then(profile => {
        const {
          sections,
          contact_options,
          user_title
        } = profile;

        res.status(200).json({
          profile: {
            first_name,
            last_name,
            email,
            sections,
            contact_options,
            user_title,
            ...extras
          }
        });
      })
      .catch(() => res.status(404).json({ msg: 'Failed to fetch user profile' }));
  })
  .catch(() => res.status(404).json({ msg: 'User page does not exist' }));
});

module.exports = router;