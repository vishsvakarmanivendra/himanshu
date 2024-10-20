import express from "express"
import { createAdmin, deleteAdmin, getPendingVendors, updateVendorStatus, getAdminById, getAllAdmins, updateAdmin } from "../controller/adminController.js";
const route = express.Router();

route.post('/admins', createAdmin);
route.post('/getAdmin', getAllAdmins)
route.get('/admins/:id', getAdminById)
route.put('/update', updateAdmin)
route.delete('/admins/:id', deleteAdmin)
route.get('/vendors/pending', getPendingVendors); // Fetch pending vendors for admin
route.put('/vendors/status', updateVendorStatus); // Admin approves/rejects vendor

export default route;
