const router = require("express").Router();
const {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getOneSubCategory,
  updateSubCategory,
} = require("../services/subCategory.service");
const {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  getOneSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../utils/validation/subCategory.validation");
router
  .route("/")
  .get(getAllSubCategories)
  .post(createSubCategoryValidator, createSubCategory);
router
  .route("/:id")
  .get(getOneSubCategoryValidator, getOneSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);
module.exports = router;
