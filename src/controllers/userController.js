const bcrypt = require("bcrypt");
const { EncodedToken } = require("../utility/Token");
const {
  sendEmailWithNodeMailer,
} = require("../utility/sendEmailWithNodeMailer");
const OTPModel = require("../models/otpModel");
const UserModel = require("../models/userModel");
const cloudinary = require("../utility/cloudinaryConfig");
const EnrollmentModel = require("../models/enrollmentModel");
const CourseModel = require("../models/courseModel");

// Registration
exports.registration = async (req, res, next) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    // password validation
    if (password.length < 4) {
      return res.status(400).json({
        success: false,
        message: "The length of User password can be minimum 4 characters",
      });
    }

    // existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exist" });
    }
    // Hashed Password
    const hashedPassword = await bcrypt.hash(password, 8);

    // create user
    await UserModel.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // response
    res.status(201).json({
      success: true,
      message: "User Registration Successful",
    });
  } catch (error) {
    next(error);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email is not registered" });
    }
    // password matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }

    // generate token
    const token = EncodedToken(req.body);

    // response
    res.status(200).json({
      success: true,
      message: "User Login Successful",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

// User Profile Get
exports.userProfileDetails = async (req, res, next) => {
  try {
    const email = req.headers.email;

    const data = await UserModel.aggregate([{ $match: { email: email } }]);

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

// Profile Update
exports.userProfileUpdate = async (req, res, next) => {
  try {
    const userEmail = req.headers.email;
    const { fullName, phoneNumber, address } = req.body;

    if (req.file) {
      // File was uploaded, process the image
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "user-profile-images",
      });

      // Update with image data
      await UserModel.updateOne(
        { email: userEmail },
        {
          image: {
            publicID: imageUpload.public_id,
            url: imageUpload.secure_url,
          },
        },
        { upsert: true }
      );
    } else {
      // No file uploaded, update without image
      await UserModel.updateOne(
        { email: userEmail },
        {
          fullName,
          phoneNumber,
          address,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Verify Email
exports.verifyEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    // OTP Generate
    const OTP = Math.floor(100000 + Math.random() * 900000);

    // Email Query
    const existEmail = await UserModel.aggregate([
      { $match: { email } },
      { $count: "total" },
    ]);

    if (existEmail.length > 0) {
      // OTP Insert
      await OTPModel.create({ email, otp: OTP });
      // email format & send email with nodemailer
      const emailData = {
        email,
        subject: "Edujar LMS",
        html: `
          <p>Hi, ${email}</p>
          <h1>Your Verify OTP Code: ${OTP}</h1>
          `,
      };
      await sendEmailWithNodeMailer(emailData);

      res.status(200).json({
        success: true,
        message: "Verification OTP Send, Please Check Your Given Email Address",
      });
    } else {
      res.status(400).json({ success: false, message: "Email Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

// Verify OTP
exports.verifyOTP = async (req, res, next) => {
  try {
    const email = req.params.email;
    const otp = req.params.otp;

    // Email Query
    const OTPCount = await OTPModel.aggregate([
      { $match: { email, otp, status: 0 } },
      { $count: "total" },
    ]);

    if (OTPCount.length > 0) {
      const data = await OTPModel.updateOne(
        { email, otp, status: 0 },
        { email, otp, status: 1 },
        { upsert: true }
      );

      res.status(200).json({
        success: true,
        message: "Verify OTP",
        data: data,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "OTP Code Already Used" });
    }
  } catch (error) {
    next(error);
  }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    const newPassword = req.body.password;

    // Email Query
    const OTPCount = await OTPModel.aggregate([
      { $match: { email, otp, status: 1 } },
      { $count: "total" },
    ]);

    if (OTPCount.length > 0) {
      // Hashed Password
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      const data = await UserModel.updateOne(
        { email },
        { password: hashedPassword }
      );

      res.status(200).json({
        status: true,
        message: "Successfully Password Reset",
        data: data,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }
  } catch (error) {
    next(error);
  }
};

// get enroll course
exports.getEnrollCourse = async (req, res, next) => {
  try {
    const email = req.headers.email;

    const user = await UserModel.find({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email is not registered" });
    }

    const enrollCourseId = user[0].enrollCourse[0].courseId;

    const result = await CourseModel.find({ _id: enrollCourseId });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
