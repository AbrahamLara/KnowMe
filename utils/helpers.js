const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('config');

// This function returns a promise that is used to get the content's
// of a file from the given path relative to the file in which this
// this function is being utilized from
function fileContentToString (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) throw err;
      
      resolve(data);
    });
  });
}

// This method is just for generating a token without having to
// always import jwt and config.
function generateToken (payload, options = { expiresIn: 60 }) {
  return new Promise ((resolve, reject) => {
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      options,
      (err, token) => {
        if (err) throw err;

        resolve(token);
      }
    );
  });
}

module.exports = {
  fileContentToString,
  generateToken
}