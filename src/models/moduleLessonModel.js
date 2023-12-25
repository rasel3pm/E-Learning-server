const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoTitle: { type: String, trim: true, required: true },
  videoURL: { type: String, required: true },
});

// Schema
const moduleSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true, unique: true },
    courseID: { type: mongoose.Schema.Types.ObjectId, required: true },
    videos: [videoSchema],
  },
  { timestamps: true, versionKey: false }
);

// Model
const ModuleLessonModel = mongoose.model("Modules", moduleSchema);
module.exports = ModuleLessonModel;
