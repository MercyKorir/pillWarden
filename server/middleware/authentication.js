import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const { JWT_SECRET } = process.env;

export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    try {
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
        // console.log("User Verified Successfully")
        return next();
      } else {
        return res.status(401).json({ message: "Authentication failed" });
      }
    } catch (err) {
      console.error("Error verifying user:", err);
      return res.status(401).json({ message: "Authentication failed" });
    }
  });
};
