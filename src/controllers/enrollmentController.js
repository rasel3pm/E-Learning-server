const sendSuccessResponse = require("../utility/sendSuccessResponse");
const enrollmentService = require("../services/enrollmentService");

// course enrollment(private)
exports.courseEnroll = async (req, res, next) => {
  try {
    const result = await enrollmentService.courseEnroll(req);
    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// enrollment user(private)
exports.enrollCourseInfo = async (req, res, next) => {
  try {
    const enrollEmail = req.headers.email;
    if (!enrollEmail) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden Access" });
    }
    const result = await enrollmentService.enrollCourseInfo(req);
    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.enrolledModules = async (req, res, next) => {
  try {
    const enrollEmail = req.headers.email;
    if (!enrollEmail) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden Access" });
    }
    const result = await enrollmentService.getSingleModule(req);
    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
