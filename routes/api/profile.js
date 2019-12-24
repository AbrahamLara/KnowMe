const express = require('express');
const router = express.Router();
const { verifyToken, authException } = require('../../middleware');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const ObjectId = require('mongoose').Types.ObjectId;

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
 * @router  POST api/profile/contactOption
 * @desc    Adds contact option to user profile
 * @access  Public
 */
router.post('/contactOption', verifyToken, (req, res) => {
  const { body, payload } = req;

  Profile.findOne({ user_id: ObjectId(payload.id) })
    .then(profile => {
      const option = body.option;
      const contact_options = profile.contact_options;
      
      if (option.type in contact_options) {
        return res.status(409).json({ msg: 'Contact option already exists'});
      }

      const newOption = { [option.type]: option };

      profile.contact_options = {...contact_options, ...newOption};
      profile.save()
        .then(() => res.json({ option: newOption }))
        .catch(() => res.status(500).json({ msg: 'Failed to add contact option' }));
    })
    .catch(() => res.status(404).json({ msg: 'Profile does not exist' }));
});

/**
 * @router  PUT api/profile/contactOption
 * @desc    Updates contact option in user profile
 * @access  Public
 */
router.put('/contactOption', verifyToken, (req, res) => {
  const { body, payload } = req;

  Profile.findOne({ user_id: ObjectId(payload.id) })
    .then(profile => {
      const { type, value } = body.option;
      const { [type]: val, ...contact_options } = profile.contact_options;

      if (!(type in profile.contact_options)) {
        return res.status(409).json({ msg: 'Contact option doesn\'t exist'});
      }

      const updatedOption = { [type]: { ...val, value } };

      profile.contact_options = Object.assign({}, contact_options, updatedOption);
      profile.save()
        .then(() => res.json({ type, value }))
        .catch(() => res.status(500).json({ msg: 'Failed to update contact option' }));
    })
    .catch(() => res.status(404).json({ msg: 'Profile does not exist' }));;
});

/**
 * @router  DELETE api/profile/contactOption/:type
 * @desc    Deletes contact option in user profile
 * @access  Public
 */
router.delete('/contactOption/:type', verifyToken, (req, res) => {
  const { params, payload } = req;

  Profile.findOne({ user_id: ObjectId(payload.id) })
    .then(profile => {
      const contact_options = profile.contact_options;
      const type = params.type;
      
      if (!(type in contact_options)) {
        return res.status(409).json({ msg: 'Contact option doesn\'t exist'});
      }

      const { [type]: value, ...rest } = profile.contact_options;

      profile.contact_options = { ...rest };
      profile.save()
        .then(() => res.json({ type }))
        .catch(() => res.status(500).json({ msg: 'Failed to delete contact option' }));
    })
    .catch(() => res.status(404).json({ msg: 'Profile does not exist' }));;
});

/**
 * @router  POST api/profile/section
 * @desc    Adds section to user profile
 * @access  Public
 */
router.post('/section', verifyToken, (req, res) => {
  const { body, payload } = req;

  Profile.findOne({ user_id: ObjectId(payload.id) })
    .then(profile => {
      const type = body.type;
      const sections = profile.sections;
      let section = null;

      switch(type) {
        case 'text':
          section = { type, name: 'Text section', value: 'Placeholder text.' };
          break;
        case 'list':
          section = { type, name: 'List section', list: ['first item'] };
          break;
        default:
          return res.status(400).json({ msg: 'Invalid section type' });
      }

      profile.sections = sections.concat(section);
      profile.save()
        .then(() => res.json({ section }))
        .catch(() => res.status(500).json({ msg: 'Failed to add section' }));
    })
    .catch(() => res.status(404).json({ msg: 'Profile does not exist' }));
});

/**
 * @router  PUT api/profile/section/name
 * @desc    Updates section name in user profile
 * @access  Public
 */
router.put('/section/name', verifyToken, (req, res) => {
  const { body, payload } = req;

  Profile.findOne({ user_id: ObjectId(payload.id) })
    .then(profile => {
      const { index, name } = body.section;
      const sections = profile.sections;
      const section = sections[index];

      section.name = name;
      sections.splice(index, 1, section);

      profile.sections = sections;
      profile.save()
        .then(() => res.json({ index, name }))
        .catch(() => res.status(500).json({ msg: 'Failed to update section' }));
    })
    .catch(() => res.status(404).json({ msg: 'Profile does not exist' }));
});

/**
 * @router  PUT api/profile/section/:type
 * @desc    Updates section content in user profile
 * @access  Public
 */
router.put('/section/:type', verifyToken, (req, res) => {
  const { body, params, payload } = req;

  Profile.findOne({ user_id: ObjectId(payload.id) })
    .then(profile => {
      const { index, data } = body.section;
      const type = params.type;
      const sections = profile.sections;
      const section = sections[index];

      if (section.type !== type) {
        return res.status(409).json({ msg: 'Invalid update on type' });
      }

      switch(type) {
        case 'text':
          section.value = data.value;
          break;
        case 'list':
          section.list.splice(data.index, 1, data.value);
          break;
        default:
          return res.status(400).json({ msg: 'Invalid section type' });
      }

      sections.splice(index, 1, section);

      profile.sections = sections;
      profile.save()
        .then(() => res.json({ index, data }))
        .catch(() => res.status(500).json({ msg: 'Failed to update section' }));
    })
    .catch(() => res.status(404).json({ msg: 'Profile does not exist' }));
});

/**
 * @router  POST api/profile/section/list
 * @desc    Adds item to list section to user profile
 * @access  Public
 */
router.post('/section/list/:index', verifyToken, (req, res) => {
  const { params, body, payload } = req;

  Profile.findOne({ user_id: ObjectId(payload.id) })
    .then(profile => {
      const index = Number(params.index);
      const sections = profile.sections;
      const section = sections[index];

      if (section.type !== 'list') {
        return res.status(409).json({ msg: 'Invalid update on type' });
      }

      section.list.splice(body.index, 0, '');
      
      sections.splice(index, 1, section);
      
      profile.sections = sections;
      profile.save()
        .then(() => res.json({ index: body.index }))
        .catch(() => res.status(500).json({ msg: 'Failed to add section' }));
    })
    .catch(() => res.status(404).json({ msg: 'Profile does not exist' }));
});

/**
 * @router  DELETE api/profile/section/list
 * @desc    Deletes item from section list
 * @access  Public
 */
router.delete('/section/list/:index', verifyToken, (req, res) => {
  const { params, body, payload } = req;

  Profile.findOne({ user_id: ObjectId(payload.id) })
    .then(profile => {
      const index = Number(params.index);
      const sections = profile.sections;
      const section = sections[index];

      if (section.type !== 'list') {
        return res.status(409).json({ msg: 'Invalid update on type' });
      }

      section.list.splice(body.index, 1);
      
      sections.splice(index, 1, section);
      
      profile.sections = sections;
      profile.save()
        .then(() => res.json({ index: body.index }))
        .catch(() => res.status(500).json({ msg: 'Failed to add section' }));
    })
    .catch(() => res.status(404).json({ msg: 'Profile does not exist' }));
});

/**
 * @router  DELETE api/profile/section
 * @desc    Deletes section in user profile
 * @access  Public
 */
router.delete('/section/:index', verifyToken, (req, res) => {
  const { params, payload } = req;

  Profile.findOne({ user_id: ObjectId(payload.id) })
    .then(profile => {
      const index = Number(params.index);
      const sections = profile.sections;

      sections.splice(index, 1);

      profile.sections = sections;
      profile.save()
        .then(() => res.json({ index }))
        .catch(() => res.status(500).json({ msg: 'Failed to delete section' }));
    })
    .catch(() => res.status(404).json({ msg: 'Profile does not exist' }));
});

module.exports = router;