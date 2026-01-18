const { body, param, validationResult } = require('express-validator');

// Handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// User registration validation
exports.validateRegister = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

// User login validation
exports.validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Resume validation
exports.validateResume = [
  body('title')
    .trim()
    .notEmpty().withMessage('Resume title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('template')
    .optional()
    .isIn(['modern', 'classic', 'minimal', 'creative', 'professional'])
    .withMessage('Invalid template selection')
];

// Experience validation
exports.validateExperience = [
  body('title')
    .trim()
    .notEmpty().withMessage('Job title is required'),
  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required'),
  body('startDate')
    .notEmpty().withMessage('Start date is required')
    .isISO8601().withMessage('Invalid date format'),
  body('endDate')
    .optional({ checkFalsy: true })
    .isISO8601().withMessage('Invalid date format')
    .custom((value, { req }) => {
      if (value && req.body.startDate && new Date(value) < new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    })
];

// Education validation
exports.validateEducation = [
  body('institution')
    .trim()
    .notEmpty().withMessage('Institution name is required'),
  body('degree')
    .trim()
    .notEmpty().withMessage('Degree is required')
];

// MongoDB ObjectId validation
exports.validateObjectId = (paramName) => [
  param(paramName)
    .isMongoId().withMessage(`Invalid ${paramName}`)
];
