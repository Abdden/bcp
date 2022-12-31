import mongoose from 'mongoose';

const schema = mongoose.Schema({
  title: String,
  image: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
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
