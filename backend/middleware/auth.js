const jwt = require("jsonwebtoken");
const User = require("../models/authModel");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    console.log("process.env.JWT_SECRETtt", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token", decoded);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    console.log("error in catch block", err);
    return res.status(401).json({ message: "Not authorizeddd" });
  }
};

module.exports = protect
