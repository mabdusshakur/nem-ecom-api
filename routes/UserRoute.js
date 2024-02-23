const express = require("express");
const router = express.Router();

// Import the user controller
const { RegisterUser, LoginUser } = require("../controllers/UserController");

// Import the avatar-upload middleware
const { uploadAvatar } = require("../middlewares/AvatarUploadMiddleware");
const { AuthMiddleware }  = require("../middlewares/AuthMiddleware");

// Define the user routes

/**
 * POST /register
 * Uploads the user's avatar using the 'uploadAvatar' middleware
 * and registers the user using the RegisterUser controller function.
 */
router.route("/register").post(uploadAvatar, RegisterUser);

/**
 * POST /login
 * Logs in the user using the LoginUser controller function.
 */
router.route("/login").post(AuthMiddleware, LoginUser);

// Export the router
module.exports = router;
