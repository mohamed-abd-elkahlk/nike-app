const { check } = require("express-validator");
const validationMiddleware = require("../../middlewares/validator.middleware");
const User = require("../../modules/user.module");

exports.updateUserDataValidator = [
  check("f_name")
    .optional()
    .withMessage("first name should have a value")
    .optional(),
  check("l_name")
    .notEmpty()
    .withMessage("first name should have a value")
    .isString(),
  check("contanct_info.email")
    .optional()
    .isEmail()
    .withMessage("please write a valied email"),
  check("contanct_info.phone")
    .optional()
    .isMobilePhone()
    .withMessage("please write a valied phone number"),
  validationMiddleware,
];

exports.updateUserPasswordValidator = [
  check("password")
    .notEmpty()
    .withMessage("you should write password")
    .isLength({ min: 6, max: 30 })
    .withMessage("password must contain at least 6 curcuter"),
  validationMiddleware,
];

exports.createUserValidator = [
  check("f_name")
    .notEmpty()
    .withMessage("first name should have a value")
    .isString(),
  check("l_name")
    .notEmpty()
    .withMessage("first name should have a value")
    .isString(),
  check("password")
    .notEmpty()
    .withMessage("you should write password")
    .isLength({ min: 6, max: 30 })
    .withMessage("password must contain at least 6 curcuter"),
  check("email")
    .notEmpty()
    .withMessage("you must write your email")
    .isEmail()
    .withMessage("you should wirte a valied email")
    .custom((val) =>
      User.findOne({ contanct_info: { email: val } }).then((user) => {
        if (!user) {
          return true;
        }
        throw new Error("this email is used before please try anohter one ");
      })
    ),
  validationMiddleware,
];
exports.updateUserValidator = [
  check("id").notEmpty().isMongoId(),
  check("f_name").optional().isString(),
  check("l_name").optional().isString(),
  check("password")
    .optional()
    .isLength({ min: 6, max: 30 })
    .withMessage("password must contain at least 6 curcuter"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("you should wirte a valied email")
    .custom((val) =>
      User.findOne({ contanct_info: { email: val } }).then((user) => {
        if (!user) {
          return true;
        }
        throw new Error("this email is used before please try anohter one ");
      })
    ),
  validationMiddleware,
];

exports.MongoIdValdator = [
  check("id").notEmpty().isMongoId(),
  validationMiddleware,
];
