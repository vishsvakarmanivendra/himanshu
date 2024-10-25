import Category from "../modal/categoryModal.js";
import Subcategory from "../modal/subCategoryModal.js";

export const getAllCategoriesWithSubcategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
        attributes: ['id', 'name'], // Select only id and name from Category
        include: [{
          model: Subcategory,
          attributes: ['id', 'name', 'subCategoryImage'] // Select only id, name, and subCategoryImage from Subcategory
        }]
    });
    
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
