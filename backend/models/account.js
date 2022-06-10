const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      unique: true,
    },
    firstName: { type: mongoose.Schema.Types.String, required: true },
    lastName: { type: mongoose.Schema.Types.String, required: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    email: { type: mongoose.Schema.Types.String, required: true },
    phone: { type: mongoose.Schema.Types.String, required: true },
    gender: { type: mongoose.Schema.Types.String, required: true },
    isAdmin: { type: mongoose.Schema.Types.Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
