const sender = require('./sender');

// This function will take in the user's email and name
// to be sent an email after successfully registering
// and specifying the severity to send messages to
function emailConfirmation (email, name, id) {
  sender.enqueueMessage({ email, name, id}, 'emails', 'conf_emails');
}

function emailWelcome (email, name) {
  sender.enqueueMessage({ email, name }, 'emails', 'reg_emails');
}

module.exports = {
  emailConfirmation,
  emailWelcome
};