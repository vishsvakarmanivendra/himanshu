import express from "express"
import bodyParser from "body-parser"
import path from "path"
import cors from "cors"
import { fileURLToPath } from "url"
import  userRouter from "./route/userRouter.js"
import vendorRouter from "./route/vendorRouter.js"
import adminRouter from "./route/adminRoute.js"
import categoryRouter from "./route/categoryRouter.js"
import subCategoryRouter from "./route/subCategoryRouter.js"
import dotenv from "dotenv"
dotenv.config()

const app=express()
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/user/",userRouter)
app.use("/vendor/",vendorRouter)
app.use("/admin/",adminRouter)
app.use("/category/",categoryRouter)
app.use("/subcategory/",subCategoryRouter)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(process.env.PORT,()=>{
    console.log(`server started ${process.env.PORT}`)
})
