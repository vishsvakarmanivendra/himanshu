import express from "express"
import { signUp,signIn,getUser,update,verifyPhoneNumber } from "../controller/userController.js"
const route=express.Router()

route.post("/signUp",signUp)
route.post("/signIn",signIn)
route.get("/getUser",getUser)
route.put("/update",update)
route.post("/verifyUser",verifyPhoneNumber)

export default route;