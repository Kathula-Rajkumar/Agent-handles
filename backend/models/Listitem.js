const mongoose = require('mongoose');
const listItemSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String,
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('ListItem', listItemSchema);