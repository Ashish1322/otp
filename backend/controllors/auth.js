const User = require("../modals/User");
const Otp = require("../modals/Otp");
const plivo = require("plivo");

const msg91 = require("msg91").default;
msg91.initialize({ authKey: "411279A99C5Z3Xrb8j656ffb3fP1" });

const generateOTP = () => {
  // Generate a 4-digit random OTP for simplicity
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const sendOtpPlivo = (phone, name, otp) => {
  let client = new plivo.Client(
    "MAOTFKZDKZMTAYOTA4MG",
    "YjE0YTA3Y2E4YWRiYWQ5YzZmYzU2MTBlY2ZmMjU5"
  );
  client.messages
    .create({
      src: "+919041160985",
      dst: phone,
      text: `Hey ${name}
            Welcome in Seedicon.
            Please use ${otp} as your otp to verify your phone number`,
    })
    .then(function (message_created) {
      console.log(message_created);
    });
};

const sendOtpMsg91 = (phone) => {
  let otp = msg91.getOTP("65700f0ad6fc0511b96c1442");
  otp.send(phone.substr(1));
};

const signup = async (req, res) => {
  try {
    const { name, phone } = req.body;
    await User.create({ name, phone });

    // create otp
    const otp = generateOTP();
    // clear all previouse otp of this phone
    await Otp.deleteMany({ phone });
    // insert new otp
    await Otp.create({ phone, otp });

    // PLIVO : Send OTP
    sendOtpPlivo(phone, name, otp);

    // MSG91 : Send OTP
    // sendOtpMsg91(phone);

    return res.status(200).json({
      success: true,
      message: "OTP has been sent on your phone please verify it",
      otp: otp,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone: phone });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Details" });
    if (user.phoneVerified == false)
      return res
        .status(400)
        .json({ success: false, message: "Please Verify your phone" });

    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, phone } = req.body;
    const dbOtp = await Otp.findOne({ phone: phone, otp: otp });

    if (dbOtp) {
      await User.findOneAndUpdate({ phone }, { phoneVerified: true });
      res.status(200).json({ success: false, message: "opt verified" });
    } else {
      res.status(400).json({ success: false, message: "Invalid Otp" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const clearDatabase = async (req, res) => {
  await User.deleteMany({});
  await Otp.deleteMany({});
  return res.status(200).json({ success: true, message: "Cleard" });
};
module.exports = { signup, login, verifyOtp, clearDatabase };
