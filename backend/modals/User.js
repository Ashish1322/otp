const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
  },
  phoneVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("otpUsers", userSchema);
