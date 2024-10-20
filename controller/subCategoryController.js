
import { where } from "sequelize";
import Subcategory from "../modal/subCategoryModal.js";

export const createSubcategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const newSubcategory = await Subcategory.create({ name, description, categoryId });
    res.status(201).json(newSubcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findOne({where:{categoryId:req.query.id}});
    if (subcategory) {
      res.status(200).json(subcategory);
    } else {
      res.status(404).json({ message: 'Subcategory not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByPk(req.body.id);
    if (subcategory) {
      const { name, description, categoryId } = req.body;
      await subcategory.update({ name, description, categoryId });
      res.status(200).json(subcategory);
    } else {
      res.status(404).json({ message: 'Subcategory not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByPk(req.query.id);
    if (subcategory) {
      await subcategory.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Subcategory not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
