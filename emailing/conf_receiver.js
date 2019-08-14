const amqp = require('amqplib/callback_api');
const { sendConfirmationEmail } = require('./utils/emailing_helpers');
const config = require('config');

// We connect our consumer (receiver) to the rabbitmq server
// that will receive messages to handle
amqp.connect(config.get('rabbitURI'), function (err, conn) {
  if (err) throw err;
  // We create a channel where we will get the messages
  // placed in the queue by the producer (sender) for
  // this receiver to handle
  conn.createChannel(function (err1, ch) {
    if (err1) throw err1;
    const severity = 'conf_emails';
    const exchange = 'emails';
    // We create a direct type of exchange.
    // Using this type of exchange the messages that the exchange
    // sends will be directly to a specific queue.
    ch.assertExchange(exchange, 'direct', { durable: false });
    // This tells RabbitMQ not to dispatch more than the given 
    // number of messages (which is 1 in this case) to a worker 
    // until it has processed and Ack'ed the previous message.
    ch.prefetch(1);
    // We create a queue with a generated name. If we don't
    // want RabbitMQ to lose our queue if it crashes set
    // durable to true. We specify exclusive so that no other
    // worker can receive messages from the same queue as another
    // worker and so that the queue can be deleted when we are done
    // with the worker
    ch.assertQueue('', {
      durable: false,
      exclusive: true
    }, function (err2, q) {
      if (err2) throw err2;
      console.log('Waiting to receive messages...');
      // We bind our receiver to the queue with the name in the first parameter
      // we then specify the exchange this queue will receive messages from,
      // and the severity for messages of 'conf_emails' to be directed in this
      // receiver
      ch.bindQueue(q.queue, exchange, severity);
      // We tell the server that we want to start receiving
      // messages. If we want RabbitMQ to discard a message only
      // after it has received an acknowledgment set noAck to false
      ch.consume(q.queue, function (msg) {
        console.log('Received message:', msg.content.toString(), 'from', severity);
        const user = JSON.parse(msg.content.toString());
        // We take the msg and parse it using JSON to extract the
        // email and name of the user to send an email so that we may
        // send an Ack to RabbitMQ
        sendConfirmationEmail(user, function (err3, info) {
          if (err3) throw err3;
          ch.ack(msg);
        });
      }, { noAck: false });
    });
  });
});