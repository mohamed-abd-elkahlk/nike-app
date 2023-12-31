const User = require("../modules/user.module");
const { ApiError } = require("../utils");
const asyncHandler = require("express-async-handler");
const { genPasswordHash, issueJwt } = require("../utils/auth");
const handler = require("./servicesHandler");

exports.showUserDate = asyncHandler(async (req, res, next) => {
  const user = User.findById(req.user._id);

  if (!user) {
    return next(new ApiError(`no user with this id :${req.user._id}`, 404));
  }
  delete user.password;

  res.status(200).json({ date: user });
});

exports.updateUserData = asyncHandler(async (req, res, next) => {
  const user = User.findByIdAndUpdate(
    req.user._id,
    {
      first_name: req.body.f_name,
      last_name: req.body.l_name,
      // avatr:req.body.l_name, // TODO:add function to update the avatar img
      contanct_info: {
        email: req.body.email,
        phone: req.body.phone,
      },
    },
    { new: true }
  );
  res.status(200).json({ data: user });
});

exports.updateUserPassword = asyncHandler(async (req, res, next) => {
  const newPassword = genPasswordHash(req.body.password);
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: { newPassword },
    },
    { new: true }
  );
  const token = issueJwt(user);
  res.status(200).cookie("jwt", token, { sameSite: "strict", httpOnly: true });
});

exports.disableUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).clearCookie("jwt");
});

//! Admin

exports.createUser = handler.createOne(User);

exports.updateUser = handler.updateOneById(User);

exports.getOneUser = handler.getOneById(User);

exports.getAllUser = handler.getAll(User);

exports.deleteUser = handler.deleteOneById(User);
