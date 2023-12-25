const mongoose = require("mongoose");
const sendSuccessResponse = require("../utility/sendSuccessResponse");
const courseService = require("../services/courseService");

// (admin) create a new course
exports.adminCreateNewCourse = async (req, res, next) => {
  try {
    const adminEmail = req.headers.email;
    const reqBody = req.body;

    const result = await courseService.adminCreateNewCourse(
      req,
      res,
      adminEmail,
      reqBody
    );

    sendSuccessResponse(res, {
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// (admin) Update Course
exports.adminUpdateExistingCourse = async (req, res, next) => {
  try {
    const adminEmail = req.headers.email;
    const courseId = req.params.id;
    const reqBody = req.body;

    const result = await courseService.adminUpdateExistingCourse(
      res,
      adminEmail,
      courseId,
      reqBody
    );

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get all courses
exports.getAllCourse = async (req, res, next) => {
  try {
    const result = await courseService.getAllCourse();

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// single courseDetails
exports.courseDetails = async (req, res, next) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.id);

    const result = await courseService.courseDetails(courseId);

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// popular course
exports.popularCourse = async (req, res, next) => {
  try {
    const result = await courseService.popularCourse();

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// courseByCategory
exports.courseByCategory = async (req, res, next) => {
  try {
    const categoryID = new mongoose.Types.ObjectId(req.params.id);

    const result = await courseService.courseByCategory(categoryID);

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
