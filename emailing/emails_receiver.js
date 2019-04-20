const amqp = require('amqplib/callback_api');
const helpers = require('./utils/helpers');
const config = require('config');
// We connect our consumer (receiver) to the rabbitmq server
// that will receive messages to handle
amqp.connect(config.get('rabbitURI'), function (err, conn) {
  // We create a channel where we will get the messages
  // placed in the queue by the producer (sender) for
  // us to handle
  conn.createChannel(function (err, ch) {
    const q = 'emails';
    // To receive we:
    // Delcare a queue for us to use. A queue will be
    // created if one does not already exist. If we don't
    // want RabbitMQ to lose our queue if it crashes set
    // durable to true. We specify exclusive so that no other
    // worker can receive messages from the same queue as another
    // worker and so that the queue can be deleted when we are done
    // with the worker
    ch.assertQueue(q, { durable: false, exclusive: false });
    // This tells RabbitMQ not to dispatch more than the given 
    // number of messages (which is 1 in this case) to a worker 
    // until it has processed and Ack'ed the previous message.
    ch.prefetch(1);
    // We tell the server that we want to start receiving
    // messages. If we want RabbitMQ to discard a message only
    // after it has received an acknowledgment set noAck to false
    console.log('Waiting to receive messges...');
    ch.consume(q, function (msg) {
      console.log('Received message:', msg.content.toString());
      const user = JSON.parse(msg.content.toString());
      // We take the msg and parse it using JSON to extract the
      // email and name of the user to send an email so that we may
      // send an Ack to RabbitMQ
      helpers.sendEmailTo(user.email, user.name, (err, info) => {
        ch.ack(msg);
      });
    }, { noAck: false });
  });
});