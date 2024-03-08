// post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
