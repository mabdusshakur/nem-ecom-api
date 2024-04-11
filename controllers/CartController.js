const Product = require("../models/ProductModel");
const User = require("../models/UserModel");

const AddToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const CartItem = {
      productId: product._id,
      quantity: 1,
      addedAt: Date.now(),
    };

    user.cart.push(CartItem);
    await user.save();

    res.status(200).json({ message: "Added to cart" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};

// Get all cart items of user
const allCartItems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.productId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ cart: user.cart });
  }
  catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error!",
      error: error.message,
    });
  }
}

module.exports = { AddToCart, allCartItems };
