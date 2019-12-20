const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * Takes in a path to a file relative to the directory
 * that contains a .js file utilizing this function to
 * get the contents of said file as a string.
 * 
 * @param {String} path 
 */
function fileContentToString(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) throw err;
      
      resolve(data);
    });
  });
}

/**
 * Utilizes jwt library to generate a signed token to be utilized
 * as a means of authentication.
 * 
 * @param {String|Object|Buffer} payload 
 * @param {Object} options 
 */
function generateToken(payload, options = { expiresIn: 3600 }) {
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

/**
 * Decodes jwt token.
 * 
 * @param {String} token 
 */
function decodeToken(token) {
  return jwt.verify(token, config.get('jwtSecret'));
}

module.exports = {
  fileContentToString,
  generateToken,
  decodeToken
}