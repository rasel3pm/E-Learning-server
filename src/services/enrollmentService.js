const CourseModel = require("../models/courseModel");
const EnrollmentModel = require("../models/enrollmentModel");
const UserModel = require("../models/userModel");
const mongoose = require("mongoose");
const SendEmailUtility = require("../utility/mailSend2");
const ObjectId = mongoose.Types.ObjectId;

exports.courseEnroll = async (req) => {
  const courseID = req.params.id;
  const userID = req.headers?._id;
  const userEmail = req.headers?.email;

  await UserModel.findByIdAndUpdate(
    userID,
    {
      $addToSet: {
        enrollCourse: { courseId: courseID },
      },
    },
    {
      new: true,
    }
  );

  const result = await EnrollmentModel.create({ userID, courseID });
  await SendEmailUtility(
    userEmail,
    "Congratulations !!",
    "You Enroll a course, Happy learning"
  );
  return result;
};

exports.enrollCourseInfo = async (req) => {
  try {
    const user_id = new ObjectId(req.headers?._id);
    if (!user_id) {
      throw new Error("UserID not provided in headers.");
    }

    const matchUser = { $match: { userID: user_id } };
    const courseJoin = {
      $lookup: {
        from: "courses",
        localField: "courseID",
        foreignField: "_id",
        as: "course",
      },
    };

    const unwindCourse = { $unwind: "$course" };
    const projection = {
      $project: {
        "course.thumbnail.publicID": 0,
        "course.thumbnail._id": 0,
        "course.createdAt": 0,
        "course.updatedAt": 0,
        "course.price": 0,
        "course.description": 0,
        "course.courseLevel": 0,
        createdAt: 0,
        updatedAt: 0,
        description: 0,
        userID: 0,
        courseID: 0,
      },
    };

    const result = await EnrollmentModel.aggregate([
      matchUser,
      courseJoin,
      unwindCourse,
      projection,
    ]);

    if (!result || result.length === 0) {
      throw new Error("No matching enrollment found for the given userID.");
    }

    return result;
  } catch (error) {
    console.error("Error in enrollCourseInfo:", error);
    throw error; // Re-throw the error for further handling or logging
  }
};
