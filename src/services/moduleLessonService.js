const ModuleLessonModel = require("../models/moduleLessonModel");
const UserModel = require("../models/userModel");

exports.adminCreateLesson = async (req, res, adminEmail, reqBody) => {
  const { title, videoTitle, courseID } = reqBody;

  const data = await UserModel.findOne({ email: adminEmail });
  if (data.role === "user") {
    return res.status(403).json({ status: false, message: "Forbidden Access" });
  }

  const videoFileUrls = req.files.map((file) => ({
    videoTitle: file.originalname,
    videoURL: file.path,
  }));

  const result = await ModuleLessonModel.create({
    title,
    videoTitle,
    courseID,
    videos: videoFileUrls,
  });

  return result;
};

exports.getAllLesson = async () => {
  const result = await ModuleLessonModel.find();
  return result;
};
