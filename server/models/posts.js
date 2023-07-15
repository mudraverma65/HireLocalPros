const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceTitle: {
    type: String,
    required: true,
    trim: true,
  },
  serviceCategory: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  maxMinPrice: {
    type: Number,
    required: true,
  },
  estimateTime: {
    type: String,
    required: true
  },
  availability: {
    type: Number,
    required: true,
  },
  serviceDescription: {
    type: String,
    required: true,
  },
  postImages: {
    type: [String],
    required: true,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
