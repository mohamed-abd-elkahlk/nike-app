const User = require("../modules/user.module");
const asyncHandeler = require("express-async-handler");
const { ApiError } = require("../utils");
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
  <p>The team at app</p>
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
exports.verfiy = asyncHandeler(async (req, res, next) => {});
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
exports.logOut = asyncHandeler(async (req, res, next) => {});
