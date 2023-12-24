const router = require("express").Router();
const {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getOneSubCategory,
  updateSubCategory,
} = require("../services/subCategory.service");

router.route("/").get(getAllSubCategories).post(createSubCategory);
router
  .route("/:id")
  .get(getOneSubCategory)
  .put(updateSubCategory)
  .delete(deleteSubCategory);
module.exports = router;
