# Emailing service

This directory is where RabbitMQ is utilized in order to handle processes such as sending emails and such to minimize wait time in the backend.

*If you are new to RabbitMQ here is the [tutorial](https://www.rabbitmq.com/getstarted.html) page.*

## Senders

Since there are different exchange types in which a consumer can send a message to reach a receiver we organize each sender based on the exchange type their receiver utilizes and severity they listen to.

## Receivers

Receivers each have their own purpose and since they each also utilize their own exchange type we structure the receivers folder based each exchange types utilized by each receiver.

## Mailtrap Setup

Mailtrap is a tool for Email testing during development. [Here](https://mailtrap.io) is the link to find out more.

Inside of the /utils folder you will need to add a js file and name it `mailtrap_creds.js`.
It should look like the following with your API information:
```js
module.exports = {
  email: 'MAILTRAP_API_EMAIL',
  user: 'MAILTRAP_API_USER',
  pass: 'MAILTRAP_API_PASSWORD'
};
```