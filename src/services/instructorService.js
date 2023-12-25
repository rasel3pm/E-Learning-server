const InstructorModel = require("../models/instructorModel");
const UserModel = require("../models/userModel");
const cloudinary = require("../utility/cloudinaryConfig");

// Get All Instructors(public)
exports.addNewInstructor = async (req, res, adminEmail, reqBody) => {
  const { name, email, description, phoneNumber } = reqBody;

  const data = await UserModel.findOne({ email: adminEmail });

  if (data.role === "user") {
    return res.status(403).json({ status: false, message: "Forbidden Access" });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUpload = await cloudinary.uploader.upload(req.file.path, {
    folder: "edujar/instructors",
  });

  const result = await InstructorModel.create({
    name,
    email,
    description,
    image: {
      publicID: imageUpload.public_id,
      url: imageUpload.secure_url,
    },
    phoneNumber,
  });
  return result;
};

// Get All Instructors(public)
exports.getAllInstructor = async () => {
  const result = await InstructorModel.find();
  return result;
};
