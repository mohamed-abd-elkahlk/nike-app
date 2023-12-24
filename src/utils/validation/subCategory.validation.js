const validationMiddleware = require("../../middlewares/validator.middleware");
const { check } = require("express-validator");
const SubCategory = require("../../modules/subCatrgory.module");
const Category = require("../../modules/catrgory.module");
exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("name field must contain at least 3 charcter")
    .isString(),
  check("category")
    .notEmpty()
    .withMessage("please provide category to this sub category")
    .custom((val, { req }) =>
      Category.findById(val).then((doc) => {
        if (!doc) {
          throw new Error(`no category with this id`);
        }
      })
    ),
  // TODO: add function that make sure that sub category in under the catgory hod
  // .custom((val, { req }) => SubCategory.find({ id: val }).then((doc)=>{
  //     if(!doc){
  //         throw new Error("")
  //     }
  // })),
  validationMiddleware,
];

exports.updateSubCategoryValidator = [
  check("name")
    .optional()
    .withMessage("name field must contain at least 3 charcter")
    .isString(),
  check("id").isMongoId().withMessage("inValid mongoo id "),
  validationMiddleware,
];
exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("inValid mongoo id "),
  validationMiddleware,
];
exports.getOneSubCategoryValidator = [
  check("id").isMongoId().withMessage("inValid mongoo id "),
  validationMiddleware,
];
