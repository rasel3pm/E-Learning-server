const UserModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const query = { email: email };

    const user = await UserModel.findOne(query);

    if (user?.role !== "admin") {
      return res.status(403).json({ status: false, message: "Forbidden Access" });
    }
    next();
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
