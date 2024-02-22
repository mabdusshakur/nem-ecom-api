const express = require("express");
const router = express.Router();

// Import the user controller
const { registerUser, loginUser } = require("../controllers/UserController");

// Import the avatar-upload middleware
const { uploadAvatar } = require("../middlewares/AvatarUploadMiddleware");

// Define the user routes

/**
 * POST /register
 * Uploads the user's avatar using the 'uploadAvatar' middleware
 * and registers the user using the registerUser controller function.
 */
router.route("/register").post(uploadAvatar, registerUser);

/**
 * POST /login
 * Logs in the user using the loginUser controller function.
 */
router.route("/login").post(loginUser);

// Export the router
module.exports = router;
