const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Category",
  },
});

subCategorySchema.pre(/^find/, function (next) {
  this.populate({ path: "category", select: "name-_id" });
  next();
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
