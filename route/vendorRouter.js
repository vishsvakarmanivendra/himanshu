import express from "express"
import { getUser, signIn, signUp, update } from "../controller/vendorController.js"
const route=express.Router()

route.post("/signUpUser",signUp)
route.post("./signIn",signIn)
route.post("/getUser",getUser)
route.put("update",update)

export default route;