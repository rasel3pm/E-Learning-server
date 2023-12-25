const mongoose = require("mongoose");

// Schema
const dataSchema = mongoose.Schema(
  {
    categoryName: { type: String, trim: true, required: true },
    categoryImg: { type: String, trim: true, required: true },
    categoryNumber: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Model
const categoryModel = mongoose.model("categories", dataSchema);
module.exports = categoryModel;
