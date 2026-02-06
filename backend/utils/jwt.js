import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const generateToken = (payload, expiresIn = "15m", tokenVersion = 0) => {
  return jwt.sign({ ...payload, tokenVersion }, JWT_SECRET, { expiresIn });
};
export const verifyToken = (token) => {
  try {
    if (!token) {
      const error = new Error("No token provided");
      error.status = 401;
      throw error;
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    return { id: decoded.id, tokenVersion: decoded.tokenVersion };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.message = "Token has expired";
      error.status = 401;
    } else if (error.name === "JsonWebTokenError") {
      error.message = "Invalid token";
      error.status = 401;
    }
    throw error;
  }
};
