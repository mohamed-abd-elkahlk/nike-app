const Handler = require("./servicesHandler");
const SubCategory = require("../modules/subCatrgory.module");

exports.createSubCategory = Handler.createOne(SubCategory);

exports.updateSubCategory = Handler.updateOneById(SubCategory);

exports.deleteSubCategory = Handler.deleteOneById(SubCategory);

exports.getOneSubCategory = Handler.getOneById(SubCategory);

exports.getAllSubCategories = Handler.getAll(SubCategory);
