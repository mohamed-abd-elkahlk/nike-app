const router = require("express").Router();
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
} = require("../services/category.service");

const {
  createCategoryValidator,
  deleteCategoryValidator,
  getOneCategoryValidator,
  updateCategoryValidator,
} = require("../utils/validation/category.validation");
router
  .route("/")
  .get(getAllCategories)
  .post(createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getOneCategoryValidator, getOneCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);
module.exports = router;
