const mongoose = require("mongoose");

// Schema
const courseSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
    description: { type: String, trim: true, required: true },
    courseLevel: { type: String, trim: true, required: true },
    courseDuration: { type: Number, required: true },
    thumbnail: [
      {
        publicID: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    courseAchievement: { type: String, required: true },
    instructorID: { type: mongoose.Schema.Types.ObjectId, required: true },
    categoryID: { type: mongoose.Schema.Types.ObjectId, required: true },
    ModuleID: { type: mongoose.Schema.Types.ObjectId, required: true },
    reviewID: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true, versionKey: false }
);

// Model
const CourseModel = mongoose.model("Courses", courseSchema);
module.exports = CourseModel;
