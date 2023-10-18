import express from "express";
import { body } from "express-validator";
import { login, signup } from "../controllers/authController.js";

const router = express.Router();

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

export default router;
