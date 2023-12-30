const { DecodedToken } = require("../utility/Token");

module.exports = async (req, res, next) => {
  const token = req.headers["token"];
  // token validation check
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token missing, Unauthorized" });
  }
  // decode token
  const decoded = DecodedToken(token);

  if (!decoded) {
    return res
      .status(401)
      .json({ success: false, message: "Token missing, Unauthorized User" });
  }
  // decoded info
  req.decoded = decoded;
  req.headers.email = decoded.user.email;
  req.headers._id = decoded["user"]["_id"];
  next();
};
