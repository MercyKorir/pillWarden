import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./loadEnvironment.js";
import { connectToMongoDB } from "./db/conn.js";

const { PORT } = process.env || 5050;

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

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
