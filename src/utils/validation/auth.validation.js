const { check } = require("express-validator");
const validationMiddleware = require("../../middlewares/validator.middleware");
const User = require("../../modules/user.module");

exports.signUpValidator = [
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

exports.verfiyValidator = [
  check("token").notEmpty().isJWT().withMessage("you prvided a broken token"),
  validationMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .isEmail()
    .withMessage("please provide a corect email"),
  check("password")
    .notEmpty()
    .isLength({ min: 6, max: 30 })
    .withMessage("password must contain at least 6 curcuter"),

  validationMiddleware,
];

exports.forgetPasswordValidator = [
  check("email")
    .notEmpty()
    .isEmail()
    .withMessage("please provide a corect email"),
  validationMiddleware,
];

exports.verifyPassResetCodeValidator = [
  check("resetcode")
    .notEmpty()
    .withMessage("please provide a restcode ")
    .isNumeric()
    .withMessage("please provide a valid restcode "),
];

exports.resetPasswordValidator = [
  check("password")
    .notEmpty()
    .isLength({ min: 6, max: 30 })
    .withMessage("password must contain at least 6 curcuter")
    .custom((val, { req }) => {
      if (val === req.body.passwordConfirm) {
        return true;
      }
      throw new Error(""); // TODO: add error massge here
    }),
];
