const NotificationModel = require("../models/notificationModel");
const createService = require("../services/createService");
const notificationService = require("../services/notificationService");
const sendSuccessResponse = require("../utility/sendSuccessResponse");

//create Notification
exports.createNotification = async (req, res) => {
  try {
    const result = await createService(req, NotificationModel);

    sendSuccessResponse(res, {
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// get All Notification
exports.getAllNotification = async (req, res, next) => {
  try {
    const result = await notificationService.getAllNotificationService();

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateNotification = async (req, res, next) => {
  try {
    const result = await notificationService.updateNotificationService(req);

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteNotification = async (req, res, next) => {
  try {
    const result = await notificationService.deleteNotificationService(req);

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
