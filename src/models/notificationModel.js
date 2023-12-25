const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const NotificationModel = mongoose.model("Notifications", notificationSchema);
module.exports = NotificationModel;
