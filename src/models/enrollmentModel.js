const mongoose = require("mongoose");

// Schema
const enrollmentSchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    courseID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Model
const EnrollmentModel = mongoose.model("Enrolls", enrollmentSchema);
module.exports = EnrollmentModel;
