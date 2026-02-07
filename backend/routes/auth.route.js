import {
  register,
  verifyEmail,
  login,
  refreshToken,
  getMe,
  logout,
} from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email/:token", verifyEmail);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.get("/me", getMe);
router.post("/logout", logout);

export default router;
