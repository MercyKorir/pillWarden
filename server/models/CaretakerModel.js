import mongoose from "mongoose";

const caretakerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  caretaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Caretaker = mongoose.model("Caretaker", caretakerSchema);

export default Caretaker;
