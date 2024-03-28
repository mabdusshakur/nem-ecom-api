const express = require("express");
const router = express.Router();

// Use multer to handle form-data body values
const multer = require("multer");
const upload = multer();

// Import the wishlist controller
const {
  AddToWishlist,
  allWishlistItems,
} = require("../controllers/WishlistController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
/**
 * POST /wishlist
 * Add to wishlist
 */
router.route("/").post(upload.none(), AuthMiddleware, AddToWishlist);

/**
 * GET /wishlist
 * get all wishlist of user
 */
router.route("/").get(upload.none(), AuthMiddleware, allWishlistItems);

// Export the router
module.exports = router;
