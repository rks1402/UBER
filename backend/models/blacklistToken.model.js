const mongoose = require('mongoose');

//Create a schema for the blacklist jwt tokens and have ttl of 24 hours

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours
  }
});

//Export the model
module.exports = mongoose.model('blacklistToken', blacklistTokenSchema);