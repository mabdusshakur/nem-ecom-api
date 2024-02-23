const User = require("../models/UserModel");

const RegisterUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
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
  return res.status(200).json({ email, password });
  try {
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const jwt_token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token : jwt_token });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { RegisterUser, LoginUser };
