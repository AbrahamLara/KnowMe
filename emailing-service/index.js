const nodemailer = require('nodemailer');
const credentials = require('./utils/mailtrap_creds');

async function sendEmailTo (email) {

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
    html: '<p>Hello world!!!</p>'
  });
}

module.exports = {
  sendEmailTo
};