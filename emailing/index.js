const sender = require('./sender');

// This fucntion will take in the user's email and name
// to be sent an email after successfully registering
// and specifying the queue to send messages through
async function send (email, name) {
  sender.enqueueMessage({ email, name }, 'emails');
}

module.exports = {
  send
};