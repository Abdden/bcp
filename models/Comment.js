const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  content: String,
});

module.exports = mongoose.model('Comment', schema);
