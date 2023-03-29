const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  pin: {
    type: Number,
    required: true,
    minlength: 4,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
