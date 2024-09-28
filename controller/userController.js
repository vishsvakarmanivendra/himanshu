import bcryptjs from "bcryptjs"
import dotenv, { configDotenv } from "dotenv"
import User from "../modal/userModal.js"
import { generateOtp, sendOtp } from "../utils/utility.js"
import { sendMail } from "../email/email.js"
import { where } from "sequelize"
dotenv.config()

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ raw: true, where: { email: req.body.email } })
    if (!user)
      return res.status(404).json({ message: "unothorised user" })
    const flag = await bcryptjs.compare(req.body.password, user.password)
    if (flag) {
      const otp = await generateOtp()
      const otpExpiry = new Date();
      const result = await User.update({ otp: otp, otpExpiry: otpExpiry }, { where: { email: user.email } })
      if (result[0] === 0) {
        return res.status(409).json({ message: "something went wrong" })
      } else {
        await sendOtp(req.body.phone, otp)
        return res.status(200).json({ message: "otp sent" })
      }
    }
    return res.status(404).json({ message: "unothorised user" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const signUp = async (req, res) => {
  try {
    const status = await User.findOne({ raw: true, where: { email: req.body.email } })
    if (status)
      return res.status(200).json({ message: "alreay have an account" })
    const salt = await bcryptjs.genSalt(10)
    req.body.password = await bcryptjs.hash(req.body.password, salt)
    const user = await User.create(req.body)
    res.status(201).json({ message: "user sign up successfully" })
  } catch (err) {
    res.status(500).json({ message: "internal server erre" })
  }
}

export const update = (req, res) => {

}

export const getUser = (req, res) => {
  console.log(req.query.email)
 User.findOne({where:{email:req.query.email}}).then(result=>{
  return res.status(200).json({user:result})
 }).catch(err=>{
  console.log(err)
  return res.status(500).json({message:"internal server err"})
 })
}

export const verifyPhoneNumber = async (req, res) => {
  try {
    const user= await User.findOne({where:{email:req.body.email}})
    const newDate=new Date()
    if(user.otp==req.body.otp && newDate>user.otpExpiry)
      return res.status(200).json({message:"valid otp"})
    return  res.status(409).json({message:"otp time out"})
  } catch (err) {
return res.status(500).json({message:"internal server err"})
  }
};











