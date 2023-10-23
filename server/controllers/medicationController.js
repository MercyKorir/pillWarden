import Medication from "../models/MedicationModel.js";

export const createMedication = async (req, res) => {
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
