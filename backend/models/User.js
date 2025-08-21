const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  role: { type: String, enum: ['admin', 'agent'], default: 'agent' }
});

module.exports = mongoose.model('User', userSchema);