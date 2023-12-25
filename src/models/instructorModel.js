const mongoose = require("mongoose");

// Schema
const instructorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String },
    image: [
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
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Model
const InstructorModel = mongoose.model("Instructors", instructorSchema);
module.exports = InstructorModel;
