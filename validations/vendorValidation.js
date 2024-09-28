import { check } from 'express-validator';

export const vendorValidation = [
    check('firstName')
        .notEmpty().withMessage('First name is required')
        .isString().withMessage('First name must be a string'),

    check('lastName')
        .notEmpty().withMessage('Last name is required')
        .isString().withMessage('Last name must be a string'),

    check('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(['male', 'female', 'other']).withMessage('Gender must be either "male", "female", or "other"'),

    check('dob')
        .notEmpty().withMessage('Date of birth is required')
        .isDate().withMessage('Date of birth must be a valid date (YYYY-MM-DD)'),

    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be a valid email address'),

    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    check('phone')
        .optional()
        .isNumeric().withMessage('Phone number must be numeric'),

    check('address')
        .notEmpty().withMessage('Address is required')
        .isString().withMessage('Address must be a string'),

    check('city')
        .notEmpty().withMessage('City is required')
        .isString().withMessage('City must be a string'),

    check('state')
        .notEmpty().withMessage('State is required')
        .isString().withMessage('State must be a string'),

    check('country')
        .notEmpty().withMessage('Country is required')
        .isString().withMessage('Country must be a string'),

    check('otp')
        .notEmpty().withMessage('OTP is required')
        .isString().withMessage('OTP must be a string'),

    check('otpExpiry')
        .notEmpty().withMessage('OTP expiry is required')
        .isNumeric().withMessage('OTP expiry must be a numeric value'),

    check('image')
        .notEmpty().withMessage('Image is required')
        .isString().withMessage('Image must be a string'),

    check('adhar')
        .notEmpty().withMessage('Adhar is required')
        .isString().withMessage('Adhar must be a string'),

    check('profession')
        .notEmpty().withMessage('Profession is required')
        .isString().withMessage('Profession must be a string')
];
