const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  verifyOtp,
  clearDatabase,
} = require("../controllors/auth");

router.post("/signup", signup);
router.get("/login", login);
router.post("/verify-otp", verifyOtp);
router.delete("/clear", clearDatabase);

module.exports = router;
