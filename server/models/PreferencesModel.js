import mongoose from "mongoose";

const preferencesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  selectedChannels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NotificationChannel",
    },
  ],
});

const Preferences = mongoose.model(
  "UserNotificationPreferences",
  preferencesSchema
);

export default Preferences;
