import { body, validationResult } from "express-validator";

const validateProduct = [
  body("productName").notEmpty().withMessage("Name is required"),
  body("category").notEmpty().withMessage("category is required"),
  body("subCategory").notEmpty().withMessage("subCategory is required"),
  body("unit").notEmpty().withMessage("unit is required"),
  body("sellingPrice").notEmpty().withMessage("sellingPrice is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("quantity")
    .optional()
    .isNumeric()
    .withMessage("Quantity must be a number"),
  body("productCode")
    .optional()
    .isString()
    .withMessage("Product code must be a string"),
  body("productStatus")
    .optional()
    .isString()
    .withMessage("Product status must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); //..
  },
];

export default validateProduct;
