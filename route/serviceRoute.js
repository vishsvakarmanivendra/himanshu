import express from 'express';
import { createService, deleteService, getAllServices, getServiceById, updateService } from '../controller/servicesController.js';

const router = express.Router();

// Route to create a new service (Only vendors can create services)
router.post('/createServices', createService);

// Route to get all services
router.get('/getAllServices', getAllServices);

// Route to get a specific service by ID
router.get('/getServiceById', getServiceById);

// Route to update a service by ID
router.put('/updateService', updateService);

// Route to delete a service by ID
router.delete('/deleteService', deleteService);

export default router;
