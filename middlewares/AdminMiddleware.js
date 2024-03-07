const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: "Forbidden, You dont have Admin Role.",
    });
  }
  next();
};

module.exports = { isAdmin };
