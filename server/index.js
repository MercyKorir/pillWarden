import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import { connectToMongoDB } from "./db/conn.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import "./config/passport.js";
import users from "./routes/user.js";
import medications from "./routes/medication.js";
import reminders from "./routes/reminder.js";

const PORT = process.env.PORT || 5050;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // handle form data

connectToMongoDB();

app.use(passport.initialize());

app.use("/user", users);
app.use("/medication", medications);
app.use("/reminder", reminders);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
