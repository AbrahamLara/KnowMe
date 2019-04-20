const amqp = require('amqplib/callback_api');

// We connect our producer (sender) to the rabbitmq server
// that will allow us to send messages
amqp.connect('amqp://localhost', function (err, conn) {
  // We create a channel that will handle the work on
  // placing messages in the queue for the consumer (receiver)
  // to complete
  conn.createChannel(function (err, ch) {
    const q = 'emails';
    const msg = 'Hello World!';
    // Publish the messages to the queue, we can also
    // give the messages an option object and make persistent
    // true
    ch.sendToQueue(q, Buffer.alloc(msg.length, msg), { persistent: false });
    console.log('Message has been sent:', msg);

    // We close the connection and exit
    setTimeout(() => { conn.close(); process.exit(0); }, 500);
  });
});