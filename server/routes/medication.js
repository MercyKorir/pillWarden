import express from "express";
import { body } from "express-validator";
import {
  createMedication,
  getAllMedications,
  getMedicationById,
  updateMedicationById,
  deleteMedicationById,
} from "../controllers/medicationController.js";
import { authenticateJWT } from "../middleware/authentication.js";

const router = express.Router();

// Create medication
router.post(
  "/create",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("dosage").notEmpty().withMessage("Dosage is required"),
  ],
  authenticateJWT,
  createMedication
);

// Get all medications
router.get("/all", authenticateJWT, getAllMedications);

// Get medication by id
router.get("/:id", authenticateJWT, getMedicationById);

// Update medication by id using patch
router.patch("/:id", authenticateJWT, updateMedicationById);

// Delete medication by id
router.delete("/:id", authenticateJWT, deleteMedicationById);

export default router;
