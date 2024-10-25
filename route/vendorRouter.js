import express from "express"
import { getVendor, signIn, signUp, update } from "../controller/vendorController.js"
import multer from "multer"
const route=express.Router()
const upload = multer({dest:"public/vendor"})

route.post("/signUpVendor",upload.single("profilePhoto"),signUp)
route.post("/signIn",signIn)
route.post("/getUser",getVendor)
route.put("/update",upload.single("profilePhoto"),update)

export default route;