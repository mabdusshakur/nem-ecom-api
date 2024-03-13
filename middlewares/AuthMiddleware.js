var { expressjwt: jwt } = require("express-jwt");

const AuthMiddleware = (req, res, next) => {
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  })(req, res, (err) => {
    if (err) {
      res.status(401).json({ error: "Authorization required" });
    } else {
      if (req.auth) {
        req.user = req.auth.user;
      }
      next();
    }
  });
};

module.exports = { AuthMiddleware };
