const mongoose = require("mongoose");
const { genPasswordHash } = require("../utils/auth");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  avater: String,
  active: {
    type: Boolean,
    default: false,
  },
  contanct_info: {
    phone: {
      type: String,
    },
    email: String,
  },
  role: {
    type: String,
    enum: ["user", "manager", "admin"],
    default: "user",
  },
  addresses: [
    {
      id: { type: mongoose.Schema.Types.ObjectId },
      alias: String,
      details: String,
      city: String,
      postalCode: String,
    },
  ],
  passwordResetCode: String,
  passwordResetExpires: String,
  passwordResetVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const password = genPasswordHash(this.password);
  this.password = password.hashedPassword;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
