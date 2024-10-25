import { check } from 'express-validator';

// Validation rules for creating/updating a category
export const categoryValidationRules = [
    check('name')
        .notEmpty()
        .withMessage('Category name is required')
        .isString()
        .withMessage('Category name must be a string')
        .isLength({ min: 3 })
        .withMessage('Category name must be at least 3 characters long')
];
