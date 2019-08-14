const {
  sendEmail,
  fileContentToString,
  generateToken
} = require('./helpers');

// We use the fileContentToString method to get the html of
// of a template as a string
function getEmailTemplate (template_name) {
  return fileContentToString(__dirname.concat(`/../templates/${template_name}.html`))
    .then(html => html)
    .catch(err => {throw new Error(err)});
}

// We get the confirm_email template as a string and replace the first
// occurance of NAME with the user's name and return the string
function getConfirmationTemplate (name, payload) {
  return Promise.all([
    getEmailTemplate('confirm_email'),
    generateToken(payload)
  ])
  .then(([html, token]) => html.replace(/NAME/, name).replace(/TOKEN/, token));
}

// We get the confirmation email template and use this to complete
// the email along with the user's email and subject
function sendConfirmationEmail ({ email, name, id }, callback) {
  return getConfirmationTemplate(name, { id })
    .then(html => sendEmail(email, 'KnowMe confirmation email', html , callback))
    .catch(err => {throw new Error(err)});
}

module.exports = {
  getEmailTemplate,
  getConfirmationTemplate,
  sendConfirmationEmail
}