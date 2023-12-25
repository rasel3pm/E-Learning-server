const mongoose = require("mongoose");

// Schema
const OTPSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    status: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

// model
const OTPModel = mongoose.model("Otps", OTPSchema);
module.exports = OTPModel;
