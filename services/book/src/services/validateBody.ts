import { body } from 'express-validator';

enum BookTypes {
  paperBack = 'paperback',
  kindle = 'kindle',
}

// 11 validate
export const validateBody = [
  body('title')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Title is required'),
  body('price')
    .isInt({ gt: 0 })
    .withMessage('Price is required, must be number and greater than 0'),
  body('description')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Description is required'),
  body('quantity')
    .isInt({ gt: 0 })
    .withMessage('Quantity is required, must be number and greater than 0'),
  body('author')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Author is required'),
  body('publisher')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Publisher is required'),
  body('type')
    .isIn([BookTypes.paperBack, BookTypes.kindle])
    .withMessage('Type of book is required, must only be paperback or kindle'),
  body('pages')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Pages of book is required'),
  body('weight')
    .isFloat({ gt: 0 })
    .withMessage('Weight is required, must be float and greater than 0'),
  body('language')
    .isString()
    .trim()
    .escape()
    .withMessage('Language must be String'),
  body('isbnTenNumber').trim().escape(),
];
