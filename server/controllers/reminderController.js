import Reminder from "../models/ReminderModel.js";
import Medication from "../models/MedicationModel.js";
import { validationResult } from "express-validator";

// Create a new reminder function
export const createReminder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "All fields are required", errors: errors.array() });
  }
  try {
    const { medication, time, frequency, customFrequency, description } =
      req.body;
    // Check if medication exists
    const medicationExists = await Medication.findById(medication);

    if (!medicationExists) {
      return res.status(404).json({ message: "Medication not found" });
    }

    // Check if medication belongs to user
    if (medicationExists.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "You are not authorized to create this reminder" });
    }

    const reminder = new Reminder({
      user: req.user._id,
      medication,
      time,
      frequency,
      description,
    });

    if (frequency === "custom") {
      reminder.customFrequency = customFrequency;
    }

    const createdReminder = await reminder.save();
    res
      .status(201)
      .json({ message: "Reminder created successfully", createdReminder });
  } catch (err) {
    console.error("Error creating reminder: ", err);
    res.status(409).json({ message: err.message });
  }
};
