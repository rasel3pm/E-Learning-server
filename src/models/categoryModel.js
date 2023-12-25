const mongoose = require("mongoose");

// Schema
const categorySchema = mongoose.Schema(
  {
    categoryName: { type: String, trim: true, required: true, unique: true },
    courseQuantity: { type: Number, required: true },
    categoryImg: [
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
  },
  { timestamps: true, versionKey: false }
);

// Model
const CategoryModel = mongoose.model("Categories", categorySchema);
module.exports = CategoryModel;
