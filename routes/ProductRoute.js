const express = require("express");
const router = express.Router();

// Use multer to handle form-data body values
const multer = require("multer");
const upload = multer();

// Import the product controller
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
} = require("../controllers/ProductController");

// Import the product-image-upload middleware
const { uploadImages } = require("../middlewares/ProductImageUploadMiddleware");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const { isAdmin } = require("../middlewares/AdminMiddleware");

// Define the product routes

/**
 * GET /products
 * Returns all products
 */
router.route("/").get(getAllProducts);

/**
 * GET /products/:id
 * Returns a single product by ID
 */
router.route("/:id").get(getProductById);

/**
 * POST /products
 * Creates a new product
 */
router.route("/").post(AuthMiddleware, isAdmin, uploadImages, createProduct);

/**
 * PUT /products/:id
 * Updates a product by ID
 */
router.route("/:id").put(AuthMiddleware, isAdmin, uploadImages, updateProduct);

/**
 * DELETE /products/:id
 * Deletes a product by ID
 */
router.route("/:id").delete(AuthMiddleware, isAdmin, deleteProduct);

/**
 * DELETE /products/:id/images/:index
 * Deletes a product image by image index
 */
router.route("/:id/images/:index").delete(AuthMiddleware, isAdmin, deleteProductImage);

// Export the router
module.exports = router;
