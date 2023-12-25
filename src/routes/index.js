const router = require("express").Router({ caseSensitive: true });
const categoryRoute = require("./category.routes");
const subCategoryRoute = require("./subCategory.routes");

router.use("/category", categoryRoute);
router.use("/subCategory", subCategoryRoute);

module.exports = router;
