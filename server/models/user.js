const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const contactRegex = /^\d{10}$/;
        return contactRegex.test(value);
      },
      message: "Please enter a valid 10-digit contact number",
    },
  },
  isServiceProvider: {
    type: Boolean,
    default: false,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    min: 18,
    max: 99,
    required: false,
  },
  experience: {
    type: Number,
    min: 0,
    required: false,
  },
  about: {
    type: String,
    maxlength: 500,
    required: false,
  },
  designation: {
    type: String,
    trim: true,
    required: false,
  },
  rating: {
    type: Number,
    default: 0,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  languagepref: {
    type: String,
    required: false,
  },
  notificationpref: {
    type: [String],
    enum: ["SMS", "Email"],
    required: false,
  },
  province: {
    type: String,
    required: false,
  },
  zip: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
