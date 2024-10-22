import bcrypt from "bcryptjs";
import User from "../modal/userModal.js";
import dotenv from "dotenv";
import { generateOtp, sendOtp } from "../utils/utility.js";
dotenv.config();

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json({ message: "Unauthorized user" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({ message: "Unauthorized user" });
    }
    return res.status(200).json({ message: "sign in successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signUp = async (req, res) => {
  try {
    const existingUser = await User.findOne({ where: { email: req.body.email } });

    if (existingUser) {
      return res.status(200).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    // Create new user
    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      currentLocation: req.body.currentLocation,
      password: req.body.password,
    });

    return res.status(201).json({ message: "User signed up successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const update = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    await User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      currentLocation: req.body.currentLocation,
    }, { where: { email: user.email } });

    return res.status(200).json({ message: "User updated successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.query.email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyPhoneNumber = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentDate = new Date();

    if (user.otp === req.body.otp && currentDate < user.otpExpiry) {
      return res.status(200).json({ message: "Valid OTP" });
    }

    return res.status(409).json({ message: "OTP timed out" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
