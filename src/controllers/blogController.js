const BlogModel = require("../models/blogModel");
const UserModel = require("../models/userModel");
const sendSuccessResponse = require("../utility/sendSuccessResponse");

// Create Blog
exports.createBlog = async (req, res, next) => {
  try {
    const adminEmail = req.headers.email;

    const data = await UserModel.findOne({ email: adminEmail });

    if (data.role === "user") {
      return res.status(403).json({ status: false, message: "Forbidden Access" });
    }

    let result = await BlogModel.create(req.body);

    sendSuccessResponse(res, {
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Update Blog
exports.updateBlog = async (req, res, next) => {
  try {
    const adminEmail = req.headers.email;
    const blogId = req.params.id;

    const data = await UserModel.findOne({ email: adminEmail });

    if (data.role === "user") {
      return res.status(403).json({ status: false, message: "Forbidden Access" });
    }

    let result = await BlogModel.findByIdAndUpdate(blogId, req.body, {
      new: true,
    });

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const result = await BlogModel.find();

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// single blog
exports.blogDetailsById = async (req, res, next) => {
  try {
    let result = await BlogModel.findById(req.params.id);

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
