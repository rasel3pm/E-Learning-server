const mongoose = require("mongoose");

// Schema
const reviewSchema = new mongoose.Schema(
  {
    ratingScore: { type: String, required: true },
    ratingDescription: { type: String, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);

// model
const ReviewModel = mongoose.model("Reviews", reviewSchema);
module.exports = ReviewModel;
