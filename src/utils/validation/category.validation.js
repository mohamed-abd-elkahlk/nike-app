const validationMiddleware = require("../../middlewares/validator.middleware");
const { check } = require("express-validator");

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("name field must contain at least 3 charcter")
    .isString(),
  validationMiddleware,
];

exports.updateCategoryValidator = [
  check("name")
    .optional()
    .withMessage("name field must contain at least 3 charcter")
    .isString(),
  check("id").isMongoId().withMessage("inValid mongoo id "),
  validationMiddleware,
];
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("inValid mongoo id "),
  validationMiddleware,
];
exports.getOneCategoryValidator = [
  check("id").isMongoId().withMessage("inValid mongoo id "),
  validationMiddleware,
];
