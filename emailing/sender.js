const amqp = require('amqplib/callback_api');
const config = require('config');

// This function takes in a message and the name of the queue
// the sender will send the message through
async function enqueueMessage (data, q) {
  // We connect our producer (sender) to the rabbitmq server
  // that will allow us to send messages
  amqp.connect(config.get('rabbitURI'), function (err, conn) {
    // We create a channel that will handle the work on
    // placing messages in the queue for the consumer (receiver)
    // to complete
    conn.createChannel(function (err, ch) {
      const msg = typeof data === 'object' ? JSON.stringify(data) : data;
      // Publish the messages to the queue, we can also
      // give the messages an option object and make persistent
      // true
      ch.sendToQueue(q, Buffer.alloc(msg.length, msg), { persistent: false });
      console.log('Message has been sent:', msg);
      // We close the connection and exit
      setTimeout(() => { conn.close(); }, 1000);
    });
  });
}

module.exports = {
  enqueueMessage
};