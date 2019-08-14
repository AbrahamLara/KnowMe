const{ fileContentToString } = require('../../utils/helpers');
const nodemailer = require('nodemailer');
const credentials = require('../utils/mailtrap_creds');

// This function creates a transport object that will be
// able to send mail by providing a host, port, and for
// authentication user and password. We pass in the user
// email, email subject, html of email as string, and a
// callback function after sending email
function sendEmail (email, subject, html, callback) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: credentials.user,
      pass: credentials.pass
    }
  });
  
  transporter.sendMail({
    from: credentials.email,
    to: `<${email}>`,
    subject,
    html
  }, callback);
}

// We use the fileContentToString method to get the contents of
// the email.html file as a string and replace NAME in the html
// html string with the name of the newly registered user
function getEmailTemplateHtml (template_name) {
  return fileContentToString(__dirname.concat(`/../templates/${template_name}.html`))
    .then(html => html)
    .catch(err => {throw new Error(err)});
}

module.exports = {
  sendEmail,
  getEmailTemplateHtml
}