import express from "express";
import { body } from "express-validator";
import { login, signup, logout } from "../controllers/authController.js";

const router = express.Router();

// Register a new user
router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .notEmpty()
      .withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  signup
);

// Login user
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .notEmpty()
      .withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

// Logout user
router.post("/logout", logout);

export default router;
