const mongoose = require("mongoose");

// Schema
const courseSliderSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDesc: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    courseID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Model
const CourseSliderModel = mongoose.model("CourseSliders", courseSliderSchema);
module.exports = CourseSliderModel;
