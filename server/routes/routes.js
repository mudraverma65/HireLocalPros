const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const PostController = require("../controllers/postController");
const AppointmentController = require("../controllers/appointmentController");
const ReviewController = require("../controllers/reviewController");
const listingsController = require("../controllers/listingsController");
const authGuard = require("../middlewares/authguard");

// user routes
router.post("/signUp", UserController.signUp);
router.post("/login", UserController.loginUser);
router.post("/resetPassword", UserController.resetPassword);

router.get("/deleteUser/:id", authGuard, UserController.deleteUser);
router.post("/updateUser/:id", authGuard, UserController.updateUser);
router.get("/getUser/:id", authGuard, UserController.getUser);
router.get("/getAllUsers", authGuard, UserController.getAllUsers);
router.get("/getAllServiceProviders",authGuard, UserController.getAllServiceProviders);
router.get("/getAllNormalUsers", authGuard, UserController.getAllNormalUsers);
router.get("/getUserFromToken", authGuard, UserController.getUserFromToken);

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

//Listings routes
router.get('/category/:category', listingsController.getUsersByCategory);

router.post("/addReview", ReviewController.addReview);

module.exports = router;
