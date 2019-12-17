const express = require('express');
const router = express.Router();
const profileExtras = require('../../middleware/profile');
const auth = require('../../middleware/auth');
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

/**
 * @router  POST api/profile/:profilePath/contactOptions
 * @param   profilePath
 * @desc    Adds contact option to user profile
 * @access  Public
 */
router.post('/:profilePath/contactOptions', auth, profileExtras, (req, res) => {
  const { body, params, extras } = req;

  if (!extras.owner) return res.status(401).json({ msg: 'Authorization denied' });

  Profile.findOne({ profile_path: params.profilePath })
    .then(profile => {
      const option = body.option;
      const contact_options = profile.contact_options;
      
      if (option.type in contact_options) return res.status(409).json({ msg: 'Contact option already exists'});

      profile.contact_options = {...contact_options, [option.type]: option};
      profile.save()
        .then(() => res.status(200).json({ msg: 'Successfully added contact option' }))
        .catch(() => res.status(500).json({ msg: 'Failed to add contact option' }));
    })
    .catch(() => res.status(404).json({ msg: 'Profile does not exist' }));
});

/**
 * @router  PUT api/profile/:profilePath/contactOptions
 * @param   profilePath
 * @desc    Updates contact option in user profile
 * @access  Public
 */
router.put('/:profilePath/contactOptions', auth, profileExtras, (req, res) => {
  const { body, params, extras } = req;

  if (!extras.owner) return res.status(401).json({ msg: 'Authorization denied' });

  Profile.findOne({ profile_path: params.profilePath })
    .then(profile => {
      const { type, value } = body.option;
      const { [type]: val, ...contact_options } = profile.contact_options;
      
      if (!(type in profile.contact_options)) return res.status(409).json({ msg: 'Contact option doesn\'t exist'});

      profile.contact_options = {...contact_options, [type]: {...contact_options[type], value}};
      profile.save()
        .then(() => res.status(200).json({ msg: 'Successfully updated contact option' }))
        .catch(() => res.status(500).json({ msg: 'Failed to update contact option' }));
    })
    .catch(() => res.status(404).json({ msg: 'Profile does not exist' }));;
});

/**
 * @router  DELETE api/profile/:profilePath/contactOption/:type
 * @param   {profilePath, type}
 * @desc    Deletes contact option in user profile
 * @access  Public
 */
router.delete('/:profilePath/contactOption/:type', auth, profileExtras, (req, res) => {
  const { params, extras } = req;

  if (!extras.owner) return res.status(401).json({ msg: 'Authorization denied' });

  Profile.findOne({ profile_path: params.profilePath })
    .then(profile => {
      const contact_options = profile.contact_options;
      const type = params.type;
      
      if (!(type in contact_options)) return res.status(409).json({ msg: 'Contact option doesn\'t exist'});

      const { [type]: value, ...rest } = profile.contact_options;

      profile.contact_options = {...rest};
      profile.save()
        .then(() => res.status(200).json({ msg: 'Successfully deleted contact option' }))
        .catch(() => res.status(500).json({ msg: 'Failed to delete contact option' }));
    })
    .catch(() => res.status(404).json({ msg: 'Profile does not exist' }));;
});

module.exports = router;