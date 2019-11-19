const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date_joined: {
    type: Date,
    default: Date.now
  },
  account_activated: {
    type: Boolean,
    required: true,
    default: false
  },
  profileId: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);