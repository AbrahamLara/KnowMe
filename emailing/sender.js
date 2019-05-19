const amqp = require('amqplib/callback_api');
const config = require('config');

// This function takes in a message and the name of the queue
// the sender will send the message through
async function enqueueMessage (data, q) {
  // We connect our producer (sender) to the rabbitmq server
  // that will allow us to send messages
  amqp.connect(config.get('rabbitURI'), function (err, conn) {
    const q = 'conf_emails';
    const exchange = 'emails';
    // We create a channel that will handle the work on
    // placing messages in the queue for the consumer (receiver)
    // to complete
    conn.createChannel(function (err, ch) {
      // We create a fanout type of exchange and name it emails].
      // Using this type of exchange the messages that the exchange
      // snd will be broadcast to all the queue's it knows
      ch.assertExchange(exchange, 'fanout', { durable: false });
      // We determine if the message is an object to stringify or
      // already a string
      const msg = typeof data === 'object' ? JSON.stringify(data) : data;
      // We publish our message to the emails exchange and by passing an empty
      // string as the routing key we are essentially not sending the message
      // the aparticular queue
      ch.publish(exchange, q, Buffer.alloc(msg.length, msg), { persistent: false });
      console.log('Message has been sent:', msg);
      // We close the connection and exit
      setTimeout(() => { conn.close(); }, 1000);
    });
  });
}

module.exports = {
  enqueueMessage
};