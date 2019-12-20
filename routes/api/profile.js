const express = require('express');
const router = express.Router();
const { verifyToken, authException } = require('../../middleware');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

/**
 * @router  GET api/profile/:profilePath
 * @param   profilePath
 * @desc    Gets user profile to load on know page
 * @access  Public
 */
router.get('/:profilePath', authException, verifyToken, (req, res) => {
  const {
    payload,
    params: { profilePath }
  } = req;

  Profile.findOne({profile_path: profilePath})
    .select(['-__v', '-_id'])
    .then(userProfile => {
      const { user_id, ...rest} = userProfile._doc;
      
      User.findById(user_id)
      .select(['-password', '-__v', '-_id', '-account_activated', '-date_joined'])
      .then(user => {
        const profile = { ...rest, ...user._doc };

        if (payload && (payload.id === String(user_id))) {
          profile.owner = true;  
        }

        res.json({ profile });
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
router.post('/:profilePath/contactOptions', verifyToken, (req, res) => {
  const { body, params, payload } = req;

  Profile.findOne({ profile_path: params.profilePath })
    .then(profile => {
      if (payload.id !== String(profile.user_id)) {
        return res.status(401).json({ msg: 'Authorization denied' });
      }

      const option = body.option;
      const contact_options = profile.contact_options;
      
      if (option.type in contact_options) {
        return res.status(409).json({ msg: 'Contact option already exists'});
      }

      const newOption = { [option.type]: option };

      profile.contact_options = {...contact_options, ...newOption};
      profile.save()
        .then(() => res.status(200).json({ option: newOption }))
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
router.put('/:profilePath/contactOptions', verifyToken, (req, res) => {
  const { body, params, payload } = req;

  Profile.findOne({ profile_path: params.profilePath })
    .then(profile => {
      if (payload.id !== String(profile.user_id)) {
        return res.status(401).json({ msg: 'Authorization denied' });
      }

      const { type, value } = body.option;
      const { [type]: val, ...contact_options } = profile.contact_options;

      if (!(type in profile.contact_options)) {
        return res.status(409).json({ msg: 'Contact option doesn\'t exist'});
      }

      profile.contact_options = {...contact_options, [type]: {...val, value}};
      profile.save()
        .then(() => res.status(200).json({ type, value }))
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
router.delete('/:profilePath/contactOption/:type', verifyToken, (req, res) => {
  const { params, payload } = req;

  Profile.findOne({ profile_path: params.profilePath })
    .then(profile => {
      if (payload.id !== String(profile.user_id)) {
        return res.status(401).json({ msg: 'Authorization denied' });
      }

      const contact_options = profile.contact_options;
      const type = params.type;
      
      if (!(type in contact_options)) {
        return res.status(409).json({ msg: 'Contact option doesn\'t exist'});
      }

      const { [type]: value, ...rest } = profile.contact_options;

      profile.contact_options = { ...rest };
      profile.save()
        .then(() => res.status(200).json({ type }))
        .catch(() => res.status(500).json({ msg: 'Failed to delete contact option' }));
    })
    .catch(() => res.status(404).json({ msg: 'Profile does not exist' }));;
});

module.exports = router;