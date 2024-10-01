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

    const otp = await generateOtp();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // Set OTP expiry for 15 minutes

    const result = await User.update({ otp, otpExpiry }, { where: { email: user.email } });

    if (result[0] === 0) {
      return res.status(409).json({ message: "Something went wrong" });
    }

    await sendOtp(req.body.phone, otp);
    return res.status(200).json({ message: "OTP sent" });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signUp = async (req, res) => {
  try {
    const existingUser = await User.findOne({ where: { email: req.body.email } });

    if (existingUser) {
      return res.status(200).json({ message: "Already have an account" });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    await User.create(req.body);
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

    // Update user fields as needed
    await User.update(req.body, { where: { email: user.email } });

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
