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
  const profilePath = req.params.profilePath;

  Profile.findOne({profile_path: profilePath})
    .then(profile => {
      const { sections, contact_options, user_title } = profile;

      User.findById(profile.user_id)
      .then(user => {
        const { first_name, last_name, email } = user;

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
      .catch(() => res.status(404).json({ msg: 'User page does not exist' }));
    })
    .catch(() => res.status(404).json({ msg: 'Failed to fetch user profile' }));
});

module.exports = router;