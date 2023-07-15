const ReviewService = require("../services/reviewService");

exports.addReview = async (req, res) => {
  try {
    const response = await ReviewService.addReview(req.body);
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
