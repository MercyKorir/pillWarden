import Medication from "../models/MedicationModel.js";
import { validationResult } from "express-validator";

// Create medication
export const createMedication = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "All fields are required", errors: errors.array() });
  }

  try {
    const { name, description, dosage } = req.body;
    const user = req.user._id;
    const newMedication = new Medication({ name, description, dosage, user });
    await newMedication.save();

    res
      .status(201)
      .json({ message: "Medication created successfully", newMedication });
  } catch (err) {
    console.error("Error creating medication: ", err);
    res.status(500).json({ message: "Error creating medication" });
  }
};

// Get all medications
export const getAllMedications = async (req, res) => {
  try {
    const medications = await Medication.find({ user: req.user._id });
    res.status(200).json({ medications });
  } catch (err) {
    console.error("Error getting all medications: ", err);
    res.status(500).json({ message: "Error getting all medications" });
  }
};

// Get medication by id
export const getMedicationById = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    res.status(200).json({ medication });
  } catch (err) {
    console.error("Error getting medication by id: ", err);
    res.status(500).json({ message: "Error getting medication by id" });
  }
};

// Update medication by id using patch
export const updateMedicationById = async (req, res) => {
  try {
    const { name, description, dosage } = req.body;
    const medication = await Medication.findById(req.params.id);
    if (medication) {
      medication.name = name || medication.name;
      medication.description = description || medication.description;
      medication.dosage = dosage || medication.dosage;
      await medication.save();
      res
        .status(200)
        .json({ message: "Medication updated successfully", medication });
    } else {
      res.status(404).json({ message: "Medication not found" });
    }
  } catch (err) {
    console.error("Error updating medication by id: ", err);
    res.status(500).json({ message: "Error updating medication by id" });
  }
};

// Delete medication by id
export const deleteMedicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user._id;
    const medication = await Medication.findById(id);
    if (medication) {
      if (medication.user.toString() !== user.toString()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const deletedMedication = await Medication.findByIdAndRemove(id);
      if (!deletedMedication) {
        return res
          .status(404)
          .json({ message: "Error deleting medication by id" });
      }
      res.status(200).json({ message: "Medication deleted successfully" });
    } else {
      res.status(404).json({ message: "Medication not found" });
    }
  } catch (err) {
    console.error("Error deleting medication by id: ", err);
    res.status(500).json({ message: "Error deleting medication by id" });
  }
};
