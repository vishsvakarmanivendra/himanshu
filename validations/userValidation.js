import { check } from 'express-validator';

export const signUpUserValidation = [
    check('firstName').optional().isString().withMessage('First name must be a string'),
    check('lastName').optional().isString().withMessage('Last name must be a string'),
    check('gender').optional().isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    check('dob').optional().isDate().withMessage('Invalid date of birth, format should be YYYY-MM-DD'),
    check('email')
        .isEmail()
        .withMessage('Email is required and must be valid')
        .notEmpty(),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    check('phone').optional().isString().withMessage('Phone must be a string'),
    check('address').optional().isString().withMessage('Address must be a string'),
    check('city').optional().isString().withMessage('City must be a string'),
    check('state').optional().isString().withMessage('State must be a string'),
    check('country').optional().isString().withMessage('Country must be a string'),
    check('otp').optional().isString().withMessage('OTP must be a string'),
    check('otpExpiry').optional().isNumeric().withMessage('OTP expiry must be a numeric value'),
    check('image').optional().isString().withMessage('Image must be a string')
];

export const updateUserValidation = [
    check('firstName')
        .notEmpty().withMessage('First name is required')
        .isString().withMessage('First name must be a string'),
    
    check('lastName')
        .notEmpty().withMessage('Last name is required')
        .isString().withMessage('Last name must be a string'),
    
    check('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    
    check('dob')
        .notEmpty().withMessage('Date of birth is required')
        .isDate().withMessage('Invalid date of birth, format should be YYYY-MM-DD'),
    
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Must be a valid email'),
    
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    
    check('phone')
        .notEmpty().withMessage('Phone is required')
        .isString().withMessage('Phone must be a string'),
    
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
        .isString().withMessage('Image must be a string')
];

