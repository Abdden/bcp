import mongoose from 'mongoose';

const schema = mongoose.Schema({
  title: String,
  image: String,
  content: String,
  comments: [{
    name: String,
    email: String,
    comment: String
  }],
  stats: {
    likes: { type: Number, default: 0 },
    user: [],
  },
});

export default mongoose.model('Blog', schema);
