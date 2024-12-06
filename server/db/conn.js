import mongoose from "mongoose";

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  throw new Error("Invalid Environment variable");
}

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

export const connectToMongoDB = async () => {
  console.log("Attempting to connect to MongoDB");

  try {
    await mongoose.connect(ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "pillWarden",
    });
  } catch (err) {
    console.error("MongoDB connection error", err);
  }
};
