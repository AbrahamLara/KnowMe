const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  profile_path: {
    type: String,
    required: true,
    unique: true
  },
  sections: {
    type: Array,
    default: []
  },
  contact_options: {
    type: Schema.Types.Mixed,
    default: {}
  },
  user_title: {
    type: String,
    default: ''
  }
}, { minimize: false });

module.exports = Profile = mongoose.model('profile', ProfileSchema);