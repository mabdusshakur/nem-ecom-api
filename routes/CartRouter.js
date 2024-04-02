const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

const {
  AddToCart,
} = require("../controllers/CartController");



// Export the router
module.exports = router;
