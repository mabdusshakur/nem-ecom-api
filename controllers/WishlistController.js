const AddToWishlist = async (req, res) => {
  try {
    res.status(200).json({ message: "Added to wishlist" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error !",
      error: err.message,
    });
  }
};

module.exports = { AddToWishlist };
