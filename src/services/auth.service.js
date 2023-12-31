const User = require("../modules/user.module");
const asyncHandeler = require("express-async-handler");
const { ApiError } = require("../utils");
const crypto = require("crypto");
const {
  genPasswordHash,
  verfiyToken,
  issueJwt,
  verifyPasswordHash,
  genrateMagicLink,
} = require("../utils/auth");
const sendEmail = require("../utils/email");

exports.signUp = asyncHandeler(async (req, res, next) => {
  const user = User.create({
    first_name: req.body.f_name,
    last_name_name: req.body.l_name,
    password: req.body.password,
    email: req.body.email,
  });
  if (!user) {
    next(new ApiError("error while creating user", 404));
  }

  const magicLink = genrateMagicLink(user.email);

  const message = `
  <html>
<head>
  <title>Verify Your Signup</title>
</head>
<body>
  <h1>Verify Your Signup</h1>
  <p>Hi ${req.body.f_name}, ${req.body.l_name}</p>
  <p>Thank you for signing up for our service!</p>
  <p>To verify your signup, please click on the following link:</p>
  <button ><a href=${magicLink}>verify</a></button>
  <p>This link will only be valid for 1 hour.</p>
  <p>Thanks,</p>
  <p>The team at nike app</p>
</body>
</html>
  `;

  try {
    await sendEmail({
      email: req.body.email,
      subject: "verify your email",
      message,
    });

    res.status(201).json({
      succes: true,
      emial: `cheke your inbox for this email ${req.body.email}`,
    });
  } catch (err) {
    return next(new ApiError(err, 500));
  }
});
exports.verfiy = asyncHandeler(async (req, res, next) => {
  const { token } = req.params;
  const isVarfiyed = verfiyToken(token);
  if (!isVarfiyed) {
    return next(new ApiError("token expired", 404));
  }

  res.status(200).json({ success: true });
});
exports.login = asyncHandeler(async (req, res, next) => {
  const user = await User.find({ contanct_info: { email: req.body.email } });
  if (!user) {
    return next(new ApiError("incorrect email or password", 401));
  }
  const verfiy = verifyPasswordHash(req.body.password, user.password);
  if (!verfiy) {
    return next(new ApiError("incorrect email or password", 401));
  }
  if (!user.active) {
    return next(new ApiError("try to active your email first", 401));
  }
  const token = issueJwt(user);
  res
    .status(200)
    .cookie("jwt", token, { httpOnly: true, sameSite: true })
    .json({ data: user });
});
exports.logout = asyncHandeler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return new ApiError("you are not loged in so you can't logout");
  }
  res.status(204).clearCookie("jwt").json({ success: true });
});

exports.allowedTo = (...roles) =>
  asyncHandeler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });

exports.forgetPassword = asyncHandeler(async (req, res, next) => {
  const user = User.findOne({ contanct_info: { email: req.body.email } });
  if (!user) {
    next(new ApiError(`user not found`, 404));
  }

  const restCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedCode = crypto.createHash("sha256").update(restCode).digest("hex");
  user.passwordResetCode = hashedCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();

  const message = `
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>resetCode</title>
  </head>
  
  <body>
      <h1>rest code</h1>
      <p>Hi ${user.first_name} ${user.last_name} <br> We received a request to reset the password on your Short url Account.</p>
      <h1>${restCode}</h1>
      <p>Enter this code to complete the reset.</p>
      <p>Thanks for helping us keep your account secure. <br> The nike Team</p>
  </body>
  
  </html>`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset code (valid for 10 min)",
      message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();
    return next(new ApiError("There is an error in sending email", 500));
  }
  res.status(200).json({
    status: "success",
    message: `Reset code sent to email: ${req.body.email}`,
  });
});

exports.verifyPassResetCode = asyncHandeler(async (req, res, next) => {
  const hashedCode = crypto
    .createHash("sha256")
    .update(req.body.resetcode)
    .digest("hex");

  const user = await User.findOne({
    passwordResetCode: hashedCode,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    next(new ApiError("restcode invalied or expired"), 404);
  }
  user.passwordResetVerified = true;
  await user.save();
  res.status(200).json({ success: true });
});

exports.resetPassword = asyncHandeler(async (req, res, next) => {
  const user = await User.findOne({ contanct_info: { email: req.body.email } });
  if (!user.passwordResetVerified) {
    next(new ApiError("reset code not varifyed", 400));
  }
  user.password = req.body.password;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  const token = issueJwt(user);
  res
    .status(200)
    .cookie("jwt", token, { httpOnly: true, sameSite: "strict" })
    .json({ token });
});
