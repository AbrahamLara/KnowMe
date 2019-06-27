const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/activate', (req, res) => {
  const token = req.query.confirmation;
  
  try {
    jwt.verify(token, config.get('jwtSecret'));
    
    res.status(200).json({ msg: 'You have successfully activated your account.' });
  } catch (e) {
    res.status(400).json({ msg: 'Failed to verify confirmation token.'});
  }

});

module.exports = router;