const CourseModel = require("../models/courseModel");
const EnrollmentModel = require("../models/enrollmentModel");
const UserModel = require("../models/userModel");

exports.courseEnroll = async (res, userID, courseID) => {
  const course = await CourseModel.findById(courseID);
  const user = await UserModel.findById(userID);

  if (!course || !user) {
    return res.status(404).json({ message: "You are not eligible to access this course" });
  }

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
  return result;
};

exports.enrollCourseInfo = async () => {
  const userJoin = {
    $lookup: { from: "users", localField: "userID", foreignField: "_id", as: "user" },
  };
  const courseJoin = {
    $lookup: { from: "courses", localField: "courseID", foreignField: "_id", as: "course" },
  };

  const unwindUser = { $unwind: "$user" };
  const unwindCourse = { $unwind: "$course" };
  const projection = {
    $project: { "course.thumbnail.publicID": 0, "course.thumbnail._id": 0, "user.password": 0 },
  };

  const result = await EnrollmentModel.aggregate([
    userJoin,
    courseJoin,
    unwindUser,
    unwindCourse,
    projection,
  ]);
  return result;
};
