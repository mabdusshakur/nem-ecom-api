
const express = require("express");
const router = express.Router();

// Import the wishlist controller
const { AddToWishlist } = require("../controllers/WishlistController");

/**
 * POST /wishlist
 * Add to wishlist
 */
router.route("/").post(AddToWishlist);

// Export the router
module.exports = router;
