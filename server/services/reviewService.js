const Review = require("../models/reviews");

exports.addReview = async (reviewDetails) => {
  try {
    const review = new Review(reviewDetails);
    return await review.save();
  } catch (error) {
    return error;
  }
};
