import mongoose from "mongoose";

const scheduledNotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reminder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reminder",
  },
  notificationChannel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NotificationChannel",
  },
  time: {
    type: String,
    required: true,
  },
});

const ScheduledNotification = mongoose.model(
  "ScheduledNotification",
  scheduledNotificationSchema
);

export default ScheduledNotification;
