const {
  sendEmail,
  getEmailTemplateHtml
} = require('./helpers');

// This function gets the confirm_email template
// as a string and replaces the only occurance of
// NAME with the name of the user receiving the email
// then the function returns the string
function getEmailConfirmationTemplate (name) {
  return getEmailTemplateHtml('confirm_email')
    .then(html => html.replace(/NAME/, name))
    .catch(e => console.log(e));
}

// Once we have the email confrmation template ready with the
// user's name the fucntion semEmail is called passing in the user's
// email, subject of email, and confirmation email template html string
// as well as a callback function
function sendConfirmationEmail (email, name, callback) {
  return getEmailConfirmationTemplate(name)
    .then(html => sendEmail(email, 'KnowMe confirmation email', html, callback))
    .catch(e => console.log(e));
}

module.exports = {
  getEmailConfirmationTemplate,
  sendConfirmationEmail
}