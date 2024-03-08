const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Add email field
  password: { type: String, required: true }, // Add password field
  bio: String,
  profilePictureUrl: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
