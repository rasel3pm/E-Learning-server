const instructorService = require("../services/instructorService");
const sendSuccessResponse = require("../utility/sendSuccessResponse");

// Create Instructor(private)
exports.addNewInstructor = async (req, res, next) => {
  try {
    const adminEmail = req.headers.email;
    const reqBody = req.body;

    const result = await instructorService.addNewInstructor(req, res, adminEmail, reqBody);

    sendSuccessResponse(res, {
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Instructors
exports.getAllInstructor = async (req, res, next) => {
  try {
    const result = await instructorService.getAllInstructor();

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
