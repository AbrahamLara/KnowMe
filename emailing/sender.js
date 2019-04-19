const amqp = require('amqplib/callback_api');

// We connect our producer (sender) to the rabbitmq server
// that will allow us to send messages
amqp.connect('amqp://localhost', function (err, conn) {
  // We create a channel that will handle the work on
  // placing messages in the queue for the consumer (receiver)
  // to complete
  conn.createChannel(function (err, ch) {
    const queue = 'emails';
    const msg = 'Hello World!';
    // To send we:
    // Delcare a queue for us to use. A queue will be
    // created if one does not already exist
    ch.assertQueue(queue, { durable: false });
    // Publish the messages to the queue
    ch.sendToQueue(queue, new Buffer(msg));
    console.log('Message has been sent:', msg);

    // We close the connection and exit
    setTimeout(() => { conn.close(); process.exit(0); }, 500);
  });
});