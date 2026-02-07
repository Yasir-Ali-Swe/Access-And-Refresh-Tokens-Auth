import { DATABASE_URL } from "./env.js";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
