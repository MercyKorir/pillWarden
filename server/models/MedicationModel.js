import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

medicationSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

const Medication = mongoose.model("Medication", medicationSchema);

export default Medication;
