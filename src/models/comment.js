const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  subject: { type: String, required: true },
  comment: { type: String, required: true }
});

module.exports = mongoose.model('Comment', commentSchema);
