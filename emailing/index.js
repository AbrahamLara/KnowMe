const { activation } = require('./senders/direct');

/**
 * This method is for utilizing the activation sender
 * enqueue user data for activation receiver to handle
 * and send activation email
 * 
 * @param {String} email 
 * @param {String} name 
 * @param {String} id 
 */
function activationEmail (email, name, id) {
  activation({ email, name, id});
}

module.exports = {
  activationEmail
};