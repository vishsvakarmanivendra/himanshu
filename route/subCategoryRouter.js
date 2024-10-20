import express from "express";
import { createSubcategory, deleteSubcategory, getAllSubcategories, getSubcategoryById, updateSubcategory } from "../controller/subCategoryController.js";
const router = express.Router();

router.post('/subcategories', createSubcategory);
router.get('/getAllSubCategory', getAllSubcategories);
router.get('/getSubCategoryByCategoryId', getSubcategoryById);
router.put('/updateSubCategories', updateSubcategory);
router.delete('/deleteSubCategory', deleteSubcategory);

export default router;
