const AddToCart = async (req, res) => {
  res.status(200).json({ message: "Added to cart" });
};
module.exports = { AddToCart };
