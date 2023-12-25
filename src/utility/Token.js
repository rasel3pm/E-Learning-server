const jwt = require("jsonwebtoken");

// encoded
exports.EncodedToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

// decoded
exports.DecodedToken =(token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};



