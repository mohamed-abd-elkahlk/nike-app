const asyncHandler = require("express-async-handler");
const { ApiError, ApiFeatures } = require("../utils");
exports.getOneById = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`can't find document with this id: ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.updateOneById = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndUpdate(id, req.body, { new: true });
    if (!document) {
      return next(
        new ApiError(`can't find document and update with this id: ${id}`, 404)
      );
    }
  });

exports.deleteOneById = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(
        new ApiError(`can't find document and delete with this id: ${id}`, 404)
      );
    }
  });
exports.getAll = Model = asyncHandler(async (req, res, next) => {
  const docCount = Model.countDocuments();
  const apiFeatures = new ApiFeatures(Model.find(), req.query)
    .filter()
    .limitFildes()
    .pagenate(docCount)
    .serch()
    .sort();
  const { pagenation, mongooseQuery } = apiFeatures;
  const document = await mongooseQuery;
  if (!document) {
    return next(new ApiError(`no data found`, 404));
  }
  res.status(200).json({
    results: docCount,
    pagenation,
    data: document,
  });
});
