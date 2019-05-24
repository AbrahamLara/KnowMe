const amqp = require('amqplib/callback_api');
const config = require('config');

// This function takes in a message and the name of the queue
// the sender will send the message through
async function enqueueMessage (data, exchange, severity) {
  // We connect our producer (sender) to the rabbitmq server
  // that will allow us to send messages
  amqp.connect(config.get('rabbitURI'), function (err, conn) {
    if (err) throw err;
    // We create a channel that will handle the work on
    // placing messages in the queue for the consumer (receiver)
    // to complete
    conn.createChannel(function (err1, ch) {
      if (err1) throw err1;
      // We determine if the message is an object to stringify or
      // already a string
      let msg;
      if (data.constructor === Object) {
        msg = JSON.stringify(data);
      } else if (data.constructor === String) {
        msg = data;
      } else {
        throw new Error('Error: data must be of type Object or String')
      }
      // We publish our message to the exchange and by passing the severity
      // as the routing key we are essentially sending a message to
      // aparticular queue
      ch.publish(exchange, severity, Buffer.alloc(msg.length, msg), { persistent: false });
      console.log('Message has been sent:', msg);
      // We close the connection and exit
      setTimeout(() => { conn.close(); }, 1000);
    });
  });
}

module.exports = {
  enqueueMessage
};