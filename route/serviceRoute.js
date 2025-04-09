import express from 'express';
import {servicesBySubCategory, createService, deleteService, getAllServices, getServiceById, updateService } from '../controller/servicesController.js';

const router = express.Router();

router.post('/createServices', createService);

router.get('/getAllServices', getAllServices);

router.get('/getServiceById', getServiceById);

router.put('/updateService', updateService);

router.get("/categoryandsubcategory", servicesBySubCategory);

router.delete('/deleteService', deleteService);

export default router;
