const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const PostController = require("../controllers/postController");
const AppointmentController = require("../controllers/appointmentController");
const ReviewController = require("../controllers/reviewController");

// user routes
router.post("/signUp", UserController.signUp);
router.get("/getUser/:id", UserController.getUser);
router.get("/getAllUsers", UserController.getAllUsers);
router.get("/deleteUser/:id", UserController.deleteUser);
router.post("/updateUser/:id", UserController.updateUser);
router.post("/login", UserController.loginUser);
router.post("/resetPassword", UserController.resetPassword);

// post routes
router.post("/createPost", PostController.createPost);
router.get("/getpost/:id", PostController.getPost);
router.get("/getAllPosts", PostController.getAllPosts);
router.post("/updatePost/:id", PostController.updatePost);
router.get("/deletePost/:id", PostController.deletePost);
router.get("/postInformation/:id", PostController.getPostInformation);
router.get("/getAllPostsofUser/:id", PostController.getAllPostsByUser);

router.post("/scheduleAppointment", AppointmentController.scheduleAppointment);
router.get("/cancelAppointment/:id", AppointmentController.cancelAppointment);
router.get(
  "/getUserAppointments/:id",
  AppointmentController.getAppointmentByUserId
);
router.get(
  "/getServiceProviderAppointemnts/:id",
  AppointmentController.getAppointmentByServiceProviderId
);

router.post("/addReview", ReviewController.addReview);

module.exports = router;
