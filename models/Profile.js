const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  sections: {
    type: Array,
    default: [] 
  },
  contact_options: {
    type: Array,
    default: []
  },
  user_title: {
    type: String,
    default: ''
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);