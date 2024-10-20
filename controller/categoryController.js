
import Category from "../modal/categoryModal.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = await Category.create({ name, description });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.body.id);
    if (category) {
      const { name, description } = req.body;
      await category.update({ name, description });
      res.status(200).json(category);DD
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.query.id);
    console.log(req.query.id)
    if (category) {
      await category.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
