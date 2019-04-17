const nodemailer = require('nodemailer');
const credentials = require('./utils/mailtrap_creds');
const helper = require('./utils/helpers');

// This function creates a transport object that will be
// able to send mail by providing a host, port, and for
// authentication user and password. It takes two agruments;
// the email of the user receiving the email and a callback
// function to perform some action based on success or failure
// of sending the email.
async function sendEmailTo (email, name, callback) {

  let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: credentials.user,
      pass: credentials.pass
    }
  });
  
  await transporter.sendMail({
    from: credentials.email,
    to: email,
    subject: 'TEST EMAIL SENDING',
    html: await helper.getEmailTemplate(name)
  }, callback);
}

module.exports = {
  sendEmailTo
};