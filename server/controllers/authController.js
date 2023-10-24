import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { validationResult } from "express-validator";

const { JWT_SECRET } = process.env;

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "All fields are required", errors: errors.array() });
  }
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) {
          return res.status(500).json({ message: "Error hashing password" });
        }
        newUser.password = hash;
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(201).json({ username: newUser.username, token });
      });
    });
  } catch (err) {
    console.error("Error registering user: ", err);
    res.status(500).json({ message: "Error registering User" });
  }
};

export const login = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      res.status(401).json({ message: "Authentication failed" });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error trying to Login" });
      }
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "24h",
      });
      res.cookie("jwt", token, {
        // httpOnly: true,
        // add options for production
      });
      return res.json({ username: user.username, token });
    });
  })(req, res, next);
};
