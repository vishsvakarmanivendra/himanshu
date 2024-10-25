import Category from "../modal/categoryModal.js";
import Subcategory from "../modal/subCategoryModal.js";
import Vendor from "../modal/vendorModel.js";
import Service from "../modal/services.js";
// Create a new service (only vendors can create services)
export const createService = async (req, res) => {
  try {
    const { name, price, vendorId, categoryId, subCategoryId } = req.body;

    // Ensure that the vendor exists
    const vendor = await Vendor.findByPk(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Ensure that the category and subcategory exist
    const category = await Category.findByPk(categoryId);
    const subcategory = await Subcategory.findByPk(subCategoryId);
    if (!category || !subcategory) {
      return res.status(404).json({ message: 'Category or Subcategory not found' });
    }

    // Create the service
    const newService = await Service.create({
      name,
      price,
      vendorId,
      categoryId,
      subCategoryId,
    });

    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        {
          model: Vendor,
          attributes: ['firstName', 'lastName'], // Include vendor's name
        },
        {
          model: Category,
          attributes: ['name'], // Include category name
        },
        {
          model: Subcategory,
          attributes: ['name', 'subCategoryImage'], // Include subcategory details
        }
      ]
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific service by ID
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.query;

    const service = await Service.findByPk(id, {
      include: [
        {
          model: Vendor,
          attributes: ['firstName', 'lastName'], // Include vendor details
        },
        {
          model: Category,
          attributes: ['name'], // Include category name
        },
        {
          model: Subcategory,
          attributes: ['name', 'subCategoryImage'], // Include subcategory details
        }
      ]
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a service by ID
export const updateService = async (req, res) => {
  try {
    const { id, name, price, categoryId, subCategoryId } = req.body;

    // Ensure the service exists
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Ensure category and subcategory exist
    const category = await Category.findByPk(categoryId);
    const subcategory = await Subcategory.findByPk(subCategoryId);
    if (!category || !subcategory) {
      return res.status(404).json({ message: 'Category or Subcategory not found' });
    }

    // Update the service
    await service.update({
      name,
      price,
      categoryId,
      subCategoryId,
    });

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a service by ID
export const deleteService = async (req, res) => {
  try {
    const { id } = req.query;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
