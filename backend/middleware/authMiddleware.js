const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  try {
    let token;

    // 1️⃣ First check cookies (preferred since you set cookies in signIn/signUp)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // 2️⃣ Fallback: check Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided" });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 4️⃣ Attach user to req object (excluding password)
    req.user = await userModel.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
});

module.exports = { protect };
