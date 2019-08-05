const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  liked: {
    type: Array,
    default: []
  },
  blocked: {
    type: Array,
    default: []
  },
  superliked: {
    type: Array,
    default: []
  },
  match: {
    type: Array,
    default: []
  },
  profilepic: {
    type: String,
    default:
      "https://www.billboard.com/files/styles/landscape_768/public/stylus/1242089-jon-bon-jovi-617-409.jpg"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
