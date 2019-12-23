const { fileContentToString, generateToken } = require('../../utils/helpers');
const nodemailer = require('nodemailer');
const credentials = require('../utils/mailtrap_creds');

/**
 * This method utilizes fileContentString to retrieve html email
 * templates as string.
 * 
 * @param {String} template_name 
 */
function getEmailTemplate (template_name) {
  return fileContentToString(__dirname.concat(`/../templates/${template_name}.html`))
    .then(html => html)
    .catch(err => {throw new Error(err)});
}

/**
 * This method is for retrieving the activation.html template
 * as a string and generating a token with the given payload
 * to display the user's name and token in the email template.
 * 
 * @param {String} name 
 * @param {String|Object} payload 
 */
function getConfirmationTemplate (name, payload) {
  return Promise.all([
    getEmailTemplate('activation'),
    generateToken(payload)
  ])
  .then(([html, token]) => html.replace(/NAME/, name).replace(/TOKEN/, token));
}

/**
 * This method is for getting the confirmation email ready to send
 * to the user's email with the subject and html
 * 
 * @param {Object} payload 
 * @param {Function} callback 
 */
function sendConfirmationEmail (payload, callback) {
  const { email, name, id } = payload;

  return getConfirmationTemplate(name, { id })
    .then(html => sendEmail(email, 'KnowMe confirmation email', html , callback))
    .catch(err => {throw new Error(err)});
}

/**
 * This method is for sending the activation email to
 * users upon succesfful regitration.
 * 
 * @param {String} email 
 * @param {String} subject 
 * @param {String} html 
 * @param {Function} callback 
 */
function sendEmail(email, subject, html, callback) {
  nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: credentials.user,
      pass: credentials.pass
    }
  }).sendMail({
    from: credentials.email,
    to: `<${email}>`,
    subject,
    html
  }, callback);
}

module.exports = {
  getEmailTemplate,
  getConfirmationTemplate,
  sendConfirmationEmail,
  sendEmail
};