const Handler = require("./servicesHandler");
const Category = require("../modules/catrgory.module");

exports.createCategory = Handler.createOne(Category);

exports.updateCategory = Handler.updateOneById(Category);

exports.deleteCategory = Handler.deleteOneById(Category);

exports.getOneCategory = Handler.getOneById(Category);

exports.getAllCategories = Handler.createOne(Category);
