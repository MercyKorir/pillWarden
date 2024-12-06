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
    type: String, // Change to Date
    required: true,
  },
  frequency: {
    type: String,
    enum: ["once", "daily", "weekly", "monthly", "custom"],
    required: true,
  },
  customFrequency: {
    daysOfWeek: [
      {
        type: String,
      },
    ],
    repeat: {
      type: Number,
      default: 1,
    },
  },
  description: {
    type: String,
    required: true,
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

reminderSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;
