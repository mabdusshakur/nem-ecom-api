const User = require("../models/UserModel");

const registerUser = async (req, res) => {
  res.status(200).json({ message: "Register User" });
};

const LoginUser = async (req, res) => {
  res.status(200).json({ message: "Login User" });
};

module.exports = { registerUser, LoginUser };
