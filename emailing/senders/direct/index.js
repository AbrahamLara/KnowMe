const enqueueMessage = require('./base_sender');

function activation(data) {
  return enqueueMessage(data, 'emails', 'activation');
}

module.exports = {
  activation
};