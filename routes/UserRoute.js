const express = require("express");
const router = express.Router();

// Use multer to handle form-data body values
const multer = require("multer");
const upload = multer();

// Import the user controller
const {
  RegisterUser,
  LoginUser,
  GetProfile,
  AddToWishlist,
} = require("../controllers/UserController");

// Import the avatar-upload middleware
const { uploadAvatar } = require("../middlewares/AvatarUploadMiddleware");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");

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
router.route("/login").post(upload.none(), LoginUser);

/**
 * GET /profile
 * Returns the user's profile
 */
router.route("/profile").get(upload.none(), AuthMiddleware, GetProfile);

/**
 * POST /wishlist
 * Adds a product to the user's wishlist
 */
router.route("/wishlist").post(upload.none(), AuthMiddleware, AddToWishlist);

// Export the router
module.exports = router;
