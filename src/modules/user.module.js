const mongoose = require("mongoose");

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
    phone: [
      {
        type: String,
      },
    ],
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
});

const User = mongoose.model("User", userSchema);

module.exports = User;
