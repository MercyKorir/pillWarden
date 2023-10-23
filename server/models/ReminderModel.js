import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  medication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medication",
  },
  time: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;
