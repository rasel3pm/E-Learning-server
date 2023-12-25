const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const BlogModel = mongoose.model("Blogs", blogSchema);
module.exports = BlogModel;
