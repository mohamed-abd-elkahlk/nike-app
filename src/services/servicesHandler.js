const asyncHandler = require("express-async-handler");
const ApiError = require("../utils");
const getOneById = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`can't find document with this id: ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

const updateOneById = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndUpdate(id, req.body, { new: true });
    if (!document) {
      return next(
        new ApiError(`can't find document and update with this id: ${id}`, 404)
      );
    }
  });

const deleteOneById = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(
        new ApiError(`can't find document and delete with this id: ${id}`, 404)
      );
    }
  });
