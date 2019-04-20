const fs = require('fs');
const nodemailer = require('nodemailer');
const credentials = require('../utils/mailtrap_creds');

// This function returns a promise that is used to get the content's
// of a file from the given path relative to the file in which this
// this function is being utilized from
async function fileContentToString (path) {
  return await new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) throw err;
      
      resolve(data);
    });
  });
}

// We use the fileContentToString method to get the contents of
// the email.html file as a string and replace NAME in the html
// html string with the name of the newly registered user
function getEmailTemplateWithName (name) {
  return fileContentToString(__dirname.concat('/../templates/email.html'))
    .then(html => html.replace(/NAME/, name))
    .catch(err => console.log(err));
}

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
    to: `<${email}>`,
    subject: 'KnowMe Registration Confirmation!!!',
    html: await getEmailTemplateWithName(name)
  }, callback);
}

module.exports = {
  fileContentToString,
  getEmailTemplateWithName,
  sendEmailTo
}