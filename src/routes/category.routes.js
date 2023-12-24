const router = require("express").Router();
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
} = require("../services/category.service");

router.route("/").get(getAllCategories).post(createCategory);
router
  .route("/:id")
  .get(getOneCategory)
  .put(updateCategory)
  .delete(deleteCategory);
module.exports = router;
