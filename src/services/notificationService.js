const NotificationModel = require("../models/notificationModel");

exports.getAllNotificationService = async () => {
  const result = await NotificationModel.find();
  return result;
};

exports.updateNotificationService = async (req) => {
  const notificationID = req.params.id;
  const result = await NotificationModel.updateOne({ _id: notificationID }, req.body, { upsert: true });
  return result;
};

exports.deleteNotificationService = async (req) => {
  const notificationID = req.params.id;
  const result = await NotificationModel.findByIdAndDelete(notificationID);
  return result;
};
