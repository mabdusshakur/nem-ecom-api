const express = require("express");
const router = express.Router();

// Use multer to handle form-data body values
const multer = require("multer");
const upload = multer();

// Import the cart controller
const { AddToCart, allCartItems } = require("../controllers/CartController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");

/**
 * POST /carts
 * Add to cart
 */
router.route("/").post(upload.none(), AuthMiddleware, AddToCart);

/**
 * GET /carts
 * get all cart of user
 */
router.route("/").get(upload.none(), AuthMiddleware, allCartItems);

// Export the router
module.exports = router;
