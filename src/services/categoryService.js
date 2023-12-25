const CategoryModel = require("../models/categoryModel");
const UserModel = require("../models/userModel");
const cloudinary = require("../utility/cloudinaryConfig");

exports.getAllCategory = async (req, res) => {
  const result = await CategoryModel.find({});
  return result;
};

exports.topCategories = async (req, res) => {
  const result = await CategoryModel.find({}).limit(3);
  return result;
};

exports.adminCreateNewCategory = async (req, res, adminEmail, reqBody) => {
  const { categoryName, courseQuantity } = reqBody;
  const data = await UserModel.findOne({ email: adminEmail });
  if (data.role === "user") {
    return res.status(403).json({ status: false, message: "Forbidden Access" });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imageUpload = await cloudinary.uploader.upload(req.file.path, {
    folder: "edujar/thumbnail",
  });

  const result = await CategoryModel.create({
    categoryName,
    courseQuantity,
    categoryImg: {
      publicID: imageUpload.public_id,
      url: imageUpload.secure_url,
    },
  });

  return result;
};
