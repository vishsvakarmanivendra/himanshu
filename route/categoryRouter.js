import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controller/categoryController.js";
const router = express.Router();

router.post('/categories',createCategory);
router.get('/getAllCategories',getAllCategories);
router.get('/getCategoryById',getCategoryById);
router.put('/update',updateCategory);
router.delete('/deleteCategory',deleteCategory);

export default router;