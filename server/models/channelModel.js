import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Channel = mongoose.model("NotificationChannel", channelSchema);

export default Channel;
