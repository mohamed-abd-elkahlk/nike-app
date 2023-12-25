const validationMiddleware = require("../../middlewares/validator.middleware");
const { check } = require("express-validator");
const Category = require("../../modules/catrgory.module");

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("name field must contain at least 3 charcter")
    .isString()
    .custom((val, { req }) =>
      Category.find({ name: val }).then((doc) => {
        if (doc.length !== 0) {
          throw new Error("this name has been used before");
        }
        return true;
      })
    ),
  validationMiddleware,
];

exports.updateCategoryValidator = [
  check("name").optional().isString(),
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
