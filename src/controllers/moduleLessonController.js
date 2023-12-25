const moduleLessonService = require("../services/moduleLessonService");
const sendSuccessResponse = require("../utility/sendSuccessResponse");

// create a new lesson(private)
exports.adminCreateLesson = async (req, res, next) => {
  try {
    const adminEmail = req.headers.email;
    const reqBody = req.body;

    const result = await moduleLessonService.adminCreateLesson(
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

// get all lesson
exports.getAllLesson = async (req, res, next) => {
  try {
    const enrollEmail = req.headers.email;

    if (!enrollEmail) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden Access" });
    }

    const result = await moduleLessonService.getAllLesson();

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
