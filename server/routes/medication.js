import express from "express";
import { createMedication } from "../controllers/medicationController.js";
import { authenticateJWT } from "../middleware/authentication.js";

const router = express.Router();

router.post("/create", authenticateJWT, createMedication);

export default router;
