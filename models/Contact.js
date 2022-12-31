import mongoose from 'mongoose';

const schema = mongoose.Schema({
  names: String,
  email: String,
  subject: String,
  message: String,
});

export default mongoose.model('Contact', schema);
