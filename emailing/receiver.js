const amqp = require('amqplib/callback_api');

// We connect our consumer (receiver) to the rabbitmq server
// that will receive messages to handle
amqp.connect('amqp://localhost', function (err, conn) {
  // We create a channel where we will get the messages
  // placed in the queue by the producer (sender) for
  // us to handle
  conn.createChannel(function (err, ch) {
    const queue = 'emails';
    // To receive we:
    // Delcare a queue for us to use. A queue will be
    // created if one does not already exist
    ch.assertQueue(queue, { durable: false });
    // We tell the server that we want to start receiving
    // messages
    console.log('Waiting to recieve messges...');
    ch.consume(queue, function (msg) {
      console.log('Received message:', msg.content.toString());
    }, { noAck: true});
  });
});