import express from "express";
import { body } from "express-validator";
import { createReminder } from "../controllers/reminderController.js";
import { authenticateJWT } from "../middleware/authentication.js";

const router = express.Router();

// Create a new reminder
router.post(
  "/create",
  [
    body("medication").notEmpty().withMessage("Medication is required"),
    body("time").notEmpty().withMessage("Time is required"),
    body("frequency").notEmpty().withMessage("Frequency is required"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  authenticateJWT,
  createReminder
);

export default router;
