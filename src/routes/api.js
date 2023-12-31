// Dependencies
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const courseController = require("../controllers/courseController");
const instructorController = require("../controllers/instructorController");
const upload = require("../utility/multerConfig");
const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");
const enrollmentController = require("../controllers/enrollmentController");
const moduleLessonController = require("../controllers/moduleLessonController");
const videoUpload = require("../utility/cloudinaryStorage");
const userVerifyMiddleware = require("../middlewares/userVerifyMiddleware");
const adminVerifyMiddleware = require("../middlewares/adminVerifyMiddleware");
const notificationController = require("../controllers/notificationController");
const sendEmailController = require("../controllers/sendEmailController");

// User Profile API Endpoint:
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/user-profile-details",userVerifyMiddleware,userController.userProfileDetails);
router.get("/get-enroll-course",userVerifyMiddleware,userController.getEnrollCourse);
router.post("/user-profile-update",userVerifyMiddleware,upload.single("image"),userController.userProfileUpdate);
// :::::: password recover ::::::
router.get("/verify-email/:email", userController.verifyEmail);
router.get("/verify-otp/:email/:otp", userController.verifyOTP);
router.post("/reset-password", userController.resetPassword);

// (Public) API Endpoint:
router.get("/all-category", categoryController.getAllCategory);
router.get("/top-categories", categoryController.topCategories);
router.get("/all-course", courseController.getAllCourse);
router.get("/course-details/:id", courseController.courseDetails);
router.get("/popular-course", courseController.popularCourse);
router.get("/all-instructor", instructorController.getAllInstructor);
router.get("/course-by-category/:id", courseController.courseByCategory);

// blogs
router.post("/create-blog",userVerifyMiddleware,adminVerifyMiddleware,blogController.createBlog);
router.post("/update-blog/:id",userVerifyMiddleware,adminVerifyMiddleware,blogController.updateBlog);
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.blogDetailsById);

// (Private) API Endpoint:
router.get("/enroll-course/:id",userVerifyMiddleware,enrollmentController.courseEnroll);
router.get("/enroll-course-info",userVerifyMiddleware,enrollmentController.enrollCourseInfo);
router.get("/get-single-module/:id",userVerifyMiddleware,enrollmentController.enrolledModules);
router.get("/get-all-lesson",userVerifyMiddleware,moduleLessonController.getAllLesson);

// (Admin) API Endpoint:
router.post("/create-new-category",userVerifyMiddleware,adminVerifyMiddleware,upload.single("categoryImg"),categoryController.adminCreateNewCategory);
router.post("/create-new-course",userVerifyMiddleware,adminVerifyMiddleware,upload.single("thumbnail"),courseController.adminCreateNewCourse);
router.post("/update-existing-course/:id",userVerifyMiddleware,adminVerifyMiddleware,courseController.adminUpdateExistingCourse);
router.post("/add-instructor",upload.single("image"),userVerifyMiddleware,adminVerifyMiddleware,instructorController.addNewInstructor);
router.post("/create-new-lesson",userVerifyMiddleware,adminVerifyMiddleware,videoUpload.array("videos"),moduleLessonController.adminCreateLesson);
router.post("/create-notification", notificationController.createNotification);
router.get("/get-all-notification", notificationController.getAllNotification);
router.post("/update-notification/:id",notificationController.updateNotification);
router.delete("/delete-notification/:id",notificationController.deleteNotification);

router.post("/send-email", sendEmailController.sendEmail);
// Exports
module.exports = router;
