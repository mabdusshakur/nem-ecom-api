const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

const {
  AddToCart,
} = require("../controllers/CartController");

/**
 * POST /carts
 * Add to cart
 */
router.route("/").post(upload.none(), AddToCart);

// Export the router
module.exports = router;
