import express from "express"
import { getVendor, signIn, signUp, update } from "../controller/vendorController.js"
const route=express.Router()

route.post("/signUpVendor",signUp)
route.post("/signIn",signIn)
route.post("/getUser",getVendor)
route.put("/update",update)

export default route;