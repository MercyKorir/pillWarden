import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { validationResult } from "express-validator";
import nodemailer from 'nodemailer';

const { JWT_SECRET,EMAIL_USER, EMAIL_PASS, FRONTEND_URL } = process.env;

// Register a new user
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

// Login user
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

// Logout user
export const logout = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out successfully" });
};

// Verify User Authenticatione
export const verifyAuth = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({isAuthenticated: false, message: "No Token Provided"});
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({isAuthenticated: false, message: "Invalid Token"});
    }

    res.status(200).json({isAuthenticated: true, userId: decoded.id});
  });
};

// Request password reset
export const requestPasswordReset = async (req, res) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({message: 'No user found with this email'});
    }

    const resetToken = jwt.sign(
      {id: user._id},
      JWT_SECRET,
      {expiresIn: '1h'}
    );
    const resetTokenExpiry = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });

    const resetUrl = `${FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset</p>
        <p>Click this link to reset your password: <a href="${resetUrl}">Reset Password</a></p>
        <p>This link will expire in 1 hour</p>
      `
    });

    res.status(200).json({message: 'Password reset link sent to email'});
  } catch (error) {
    res.status(500).json({message: 'Error processing password reset', error: error.message});
  }
}

// Reset Password
export const resetPassword = async (req, res) => {
  const {token, newPassword} = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {$gt: Date.now()}
    });

    if (!user) {
      return res.status(400).json({message: 'Invalid or Expired reset token'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({message: 'Password Reset Successful'});
  } catch (error) {
    res.status(500).json({message: 'Error reseting password', error: error.message});
  }
}
