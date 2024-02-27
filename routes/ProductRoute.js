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

// Define the product routes

/**
 * GET /products
 * Returns all products
 */
router.route("/products").get(getAllProducts);

/**
 * GET /products/:id
 * Returns a single product by ID
 */
router.route("/products/:id").get(getProductById);

/**
 * POST /products
 * Creates a new product
 */
router.route("/products").post(AuthMiddleware, uploadImages, createProduct);

/**
 * PUT /products/:id
 * Updates a product by ID
 */
router.route("/products/:id").put(AuthMiddleware, uploadImages, updateProduct);

/**
 * DELETE /products/:id
 * Deletes a product by ID
 */
router.route("/products/:id").delete(AuthMiddleware, deleteProduct);

/**
 * DELETE /products/:id/images/:index
 * Deletes a product image by image index
 */
router.route("/products/:id/images/:index").delete(AuthMiddleware, deleteProductImage);

// Export the router
module.exports = router;
