const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RegisterUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please enter all fields",
      });
    }
    const user = new User({
      first_name,
      last_name,
      email,
      password,
      avatar: "uploads/avatar/" + req.file.filename,
    });
    const result = await user.save();
    res.status(201).json({
      status: true,
      message: "User registered",
      user: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials !" });
    }
    const jwt_token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ token: jwt_token });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error !",
      error: err.message,
    });
  }
};

const GetProfile = async (req, res) => {
  res.status(200).json(req.user);
};

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

module.exports = { RegisterUser, LoginUser, GetProfile, AddToWishlist };
