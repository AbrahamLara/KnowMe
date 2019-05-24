const {
  sendEmail,
  fileContentToString
} = require('./helpers');

// We use the fileContentToString method to get the contents of
// the email.html file as a string and replace NAME in the html
// html string with the name of the newly registered user
function getEmailTemplateWithName (name) {
  return fileContentToString(__dirname.concat('/../templates/confirm_email.html'))
    .then(html => html.replace(/NAME/, name))
    .catch(err => console.log(err));
}

// We get the confirmation email template html with the user's
// email and name as a string and pass the html as the third argument in the
// sendEmail method
function sendConfirmationEmail (email, name, callback) {
  return getEmailTemplateWithName(name)
    .then(html => sendEmail(email, 'KnowMe confirmation email', html , callback))
    .catch(err => console.log(err));
}

module.exports = {
  getEmailTemplateWithName,
  sendConfirmationEmail
}