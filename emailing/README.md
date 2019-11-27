# KnowMe emailing service

This directory is where RabbitMQ is utilized in order to handle processes such as sending emails out to users upon registration without causing wait time for the email to finsh sending.

The [sender.js](sender.js) file can be used to send a message to an exchange and a specified queue given the severity.

The [receiver.js](receiver.js) is only used to receieve messages from __emails__ exchange and __conf_emails__ severity to handle sending emails after a successful registration.

The receivers in this directory are automatically ran once the project is started using `npm run dev` in the root directory of this project.