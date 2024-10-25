import express from "express"
import { signUp,signIn,getUser,update,verifyPhoneNumber } from "../controller/userController.js"
import multer from "multer"
const route=express.Router()
const upload = multer({dest:"public/user"})

route.post("/signUp",upload.single("userImage"),signUp)
route.post("/signIn",signIn)
route.get("/getUser",getUser)
route.put("/update",upload.single("userImage"),update)
route.post("/verifyUser",verifyPhoneNumber)

export default route;