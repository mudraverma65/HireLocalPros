const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  review: {
    type: String,
    required: false,
  },
});

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
