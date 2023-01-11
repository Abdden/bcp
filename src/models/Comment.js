import mongoose from 'mongoose';

const schema = mongoose.Schema({
  comment: String,
});

module.exports = mongoose.model('Comment', schema);
