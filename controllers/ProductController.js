// Import Product model
const Product = require("../models/ProductModel");
const fs = require("fs");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message});
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = await Product.create({ name, description, price });
    if (req.files) {
      req.files.forEach((file) => {
        product.images.push({
          url: "uploads/product-images/" + file.filename,
          filename: file.filename,
        });
      });
      await product.save();
    }
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );
    if (req.files) {
      req.files.forEach((file) => {
        product.images.push({
          url: "uploads/product-images/" + file.filename,
          filename: file.filename,
        });
      });
      await product.save();
    }
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message});
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message});
  }
};

// Delete an image from a product by ID
const deleteProductImage = async (req, res) => {
  const { id, index } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const imageName = product.images[index].url;
    // Delete the image from the uploads folder
    fs.unlinkSync(imageName);

    product.images.splice(index, 1);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message});
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
};
