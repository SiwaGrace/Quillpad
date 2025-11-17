const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Generate JWT
const generateToken = (id, email) => {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new Error("JWT_SECRET is missing from environment variables");

  return jwt.sign({ id, email }, secret, { expiresIn: "1h" });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  //
  const { username, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // // Hash password
  // const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    username,
    email,
    password,
    // : hashedPassword,
  });

  if (user) {
    const token = generateToken(user._id, user.email);

    // Set cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // set to true in production,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(201)
      .json({
        message: "User registered successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        token,
      });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id, user.email);

  // Set cookie
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      message: "Login successful",
      user: user,
      token,
    });
});

// @desc    Logout user (clear cookie)
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully" });
});

// @desc    Get current user (from cookie)
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({
    message: "user details",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

// @desc    Send password reset link
// @route   POST /api/auth/forgot-password
// @access  Publicd
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`,
    });

    res.json({ message: "Reset link sent to your email" });
  } catch (error) {
    // Rollback token if email fails
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(500).json({ message: "Email could not be sent" });
  }
});

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  // Update password (hashed automatically in pre-save)
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  forgotPassword,
  resetPassword,
};
