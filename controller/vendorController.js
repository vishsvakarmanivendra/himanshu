import Vendor from "../modal/vendorModel.js";
import bcryptjs from "bcryptjs"
export const signIn = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ where: { email: req.body.email } });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (vendor.status !== 'approved') {
      return res.status(403).json({ message: "Your account is not yet approved by admin" });
    }

    const isPasswordValid = await bcryptjs.compare(req.body.password, vendor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signUp = async (req, res) => {
  try {
    const existingVendor = await Vendor.findOne({ where: { email: req.body.email } });

    if (existingVendor) {
      return res.status(200).json({ message: "Email already registered" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    req.body.password = hashedPassword;
    req.body.status = 'pending';

    const newVendor = await Vendor.create(req.body);

    return res.status(201).json({
      message: "Signup request submitted. Awaiting admin approval.",
      vendor: newVendor
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const update = async (req, res) => {
  try {
    const { email } = req.body;

    const vendor = await Vendor.findOne({ where: { email } });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (vendor.status !== 'approved') {
      return res.status(403).json({ message: "You can only update your profile after approval by admin." });
    }

    // If password needs to be updated, hash it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // Update the vendor with the new data (only allow certain fields)
    const allowedUpdates = ['firstName', 'lastName', 'phone', 'address', 'city', 'state', 'country', 'image', 'password'];
    const updates = Object.keys(req.body).filter(key => allowedUpdates.includes(key));

    updates.forEach(update => vendor[update] = req.body[update]);

    await vendor.save();

    return res.status(200).json({ message: "Vendor updated successfully", vendor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getVendor = async (req, res) => {
  try {
    const Vendor = await Vendor.findOne({ where: { email: req.query.email } });

    if (!Vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    return res.status(200).json({ Vendor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyPhoneNumber = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ where: { email: req.body.email } });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const currentDate = new Date();

    if (vendor.otp === req.body.otp && currentDate < Vendor.otpExpiry) {
      return res.status(200).json({ message: "Valid OTP" });
    }

    return res.status(409).json({ message: "OTP timed out" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};