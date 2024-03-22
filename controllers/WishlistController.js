const Product = require("../models/ProductModel");
const User = require("../models/UserModel");

const AddToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const wishlistItem = {
      productId: product._id,
      addedAt: Date.now(),
    };

    user.wishlist.push(wishlistItem);
    await user.save();

    res.status(200).json({ message: "Added to wishlist" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};

module.exports = { AddToWishlist };
