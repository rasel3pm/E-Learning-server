const categoryService = require("../services/categoryService");
const sendSuccessResponse = require("../utility/sendSuccessResponse");

// get All Category
exports.getAllCategory = async (req, res, next) => {
  try {
    const result = await categoryService.getAllCategory();

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// top Categories
exports.topCategories = async (req, res, next) => {
  try {
    const result = await categoryService.topCategories();

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// (admin) create a new Category
exports.adminCreateNewCategory = async (req, res, next) => {
  try {
    const adminEmail = req.headers.email;
    const reqBody = req.body;

    const result = await categoryService.adminCreateNewCategory(req, res, adminEmail, reqBody);

    sendSuccessResponse(res, {
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
