import userModel from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { sendVerificationEmail } from "../utils/send.verification.email.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser && !existingUser.isVerified) {
      const token = generateToken({ id: existingUser._id }, "15m");
      await sendVerificationEmail(email, token);
      return res.status(201).json({
        success: true,
        message:
          "A new verification email has been sent. Please verify your email.",
      });
    }

    if (existingUser && existingUser.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    const token = generateToken({ id: newUser._id }, "15m");
    await sendVerificationEmail(email, token);

    res.status(201).json({
      success: true,
      message:
        "Registration successful. A verification email has been sent to your email address.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const { id } = verifyToken(token);
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification link" });
    }
    if (user.isVerified) {
      return res
        .status(200)
        .json({ success: false, message: "Email already verified" });
    }
    user.isVerified = true;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Please verify your email first" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const accessToken = generateToken(
      { id: user._id },
      "15m",
      user.tokenVersion,
    );
    const refreshToken = generateToken(
      { id: user._id },
      "7d",
      user.tokenVersion,
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "No refresh token provided" });
    }
    const { id, tokenVersion } = verifyToken(refreshToken);
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid refresh token" });
    }
    if (user.tokenVersion !== tokenVersion) {
      return res
        .status(401)
        .json({ success: false, message: "Refresh token has been revoked" });
    }
    const newAccessToken = generateToken(
      { id: user._id },
      "15m",
      user.tokenVersion,
    );
    const newRefreshToken = generateToken(
      { id: user._id },
      "7d",
      user.tokenVersion,
    );
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res
        .status(401)
        .json({ success: false, message: "No access token provided" });
    }
    const { id, tokenVersion } = verifyToken(accessToken);
    const user = await userModel
      .findById(id)
      .select("-password -createdAt -updatedAt -__v");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.tokenVersion !== tokenVersion) {
      return res
        .status(401)
        .json({ success: false, message: "Access token has been revoked" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "No Active Session Found" });
    }
    const { id, tokenVersion } = verifyToken(refreshToken);
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Session" });
    }
    if (user.tokenVersion !== tokenVersion) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Session has already been invalidated",
        });
    }
    user.tokenVersion += 1;
    await user.save();
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
