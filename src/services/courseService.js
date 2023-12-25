const CourseModel = require("../models/courseModel");
const UserModel = require("../models/userModel");
const cloudinary = require("../utility/cloudinaryConfig");

exports.adminCreateNewCourse = async (req, res, adminEmail, reqBody) => {
  const {
    title,
    price,
    courseLevel,
    courseDuration,
    description,
    courseAchievement,
    instructorID,
    categoryID,
    ModuleID,
  } = reqBody;
  const data = await UserModel.findOne({ email: adminEmail });
  if (data.role === "user") {
    return res.status(403).json({ status: false, message: "Forbidden Access" });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imageUpload = await cloudinary.uploader.upload(req.file.path, {
    folder: "edujar/thumbnail",
  });

  const result = await CourseModel.create({
    title,
    price,
    description,
    courseLevel,
    courseDuration,
    courseAchievement,
    thumbnail: {
      publicID: imageUpload.public_id,
      url: imageUpload.secure_url,
    },
    instructorID,
    categoryID,
    ModuleID,
  });

  return result;
};

exports.adminUpdateExistingCourse = async (res, adminEmail, courseId, reqBody) => {
  const data = await UserModel.findOne({ email: adminEmail });
  if (data.role === "user") {
    return res.status(403).json({ status: false, message: "Forbidden Access" });
  }

  const result = await CourseModel.findByIdAndUpdate(courseId, reqBody, {
    new: true,
  });

  return result;
};

exports.getAllCourse = async () => {
  const categoriesJoin = {
    $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" },
  };
  const instructorJoin = {
    $lookup: { from: "instructors", localField: "instructorID", foreignField: "_id", as: "instructor" },
  };
  const unwindCategory = { $unwind: "$category" };
  const unwindInstructors = { $unwind: "$instructor" };
  const projection = {
    $project: { "thumbnail.publicID": 0, "thumbnail._id": 0, ModuleID: 0, instructorID: 0 },
  };

  const result = await CourseModel.aggregate([
    categoriesJoin,
    instructorJoin,
    unwindCategory,
    unwindInstructors,
    projection,
  ]);

  return result;
};

exports.courseDetails = async (courseId) => {
  const match = { $match: { _id: courseId } };
  const categoriesJoin = {
    $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" },
  };
  const instructorJoin = {
    $lookup: { from: "instructors", localField: "instructorID", foreignField: "_id", as: "instructor" },
  };

  const moduleJoin = {
    $lookup: { from: "modules", localField: "ModuleID", foreignField: "_id", as: "module" },
  };

  const unwindCategory = { $unwind: "$category" };
  const unwindInstructors = { $unwind: "$instructor" };
  const unwindModule = { $unwind: "$module" };
  const projection = {
    $project: { "thumbnail.publicID": 0, "thumbnail._id": 0, ModuleID: 0, instructorID: 0, categoryID: 0 },
  };

  const result = await CourseModel.aggregate([
    match,
    categoriesJoin,
    instructorJoin,
    moduleJoin,
    unwindCategory,
    unwindInstructors,
    unwindModule,
    projection,
  ]);

  return result;
};

exports.courseByCategory = async (categoryID) => {
  const matchID = { $match: { categoryID: categoryID } };

  const projectionStage = {
    $project: {
      categoryID: 0,
      courseAchievement: 0,
      createdAt: 0,
      instructorID: 0,
      ModuleID: 0,
      updatedAt: 0,
    },
  };

  const result = await CourseModel.aggregate([matchID, projectionStage]);
  return result;
};

exports.popularCourse = async () => {
  const result = await CourseModel.find({}).sort({ createdAt: -1 }).limit(4);
  return result;
};
