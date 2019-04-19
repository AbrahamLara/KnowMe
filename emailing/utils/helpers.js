const fs = require('fs');

// This function returns a promise that is used to get the content's
// of a file from the given path relative to this file's location
async function fileContentToString (path) {
  return await new Promise((resolve, reject) => {
    fs.readFile(__dirname.concat(path), 'utf-8', (err, data) => {
      if (err) throw err;
      
      resolve(data);
    });
  });
}

// We use the fileContentToString method to get the contents of
// the email.html file as a string and replace NAME in the html
// html string with the name of the newly registered user
function getEmailTemplate (name) {
  return fileContentToString('/../templates/email.html')
    .then(html => html.replace(/NAME/, name))
    .catch(err => console.log(err));
}

module.exports = {
  fileContentToString,
  getEmailTemplate
}