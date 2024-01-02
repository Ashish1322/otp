const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const plivo = require("plivo");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0"
  )
  .then(() => {
    console.log("Database Connected");
    app.listen(3000, () => console.log("OTP Service is running on prot 3000"));
  })
  .catch((err) => {
    console.log("Error while connecting to datbase : ," + err.message);
  });

// app.all("/outbound_sms/", function (request, response) {
//   let client = new plivo.Client(
//     "MAOTFKZDKZMTAYOTA4MG",
//     "YjE0YTA3Y2E4YWRiYWQ5YzZmYzU2MTBlY2ZmMjU5"
//   );
//   client.messages
//     .create({
//       src: "+919041160985",
//       dst: "+917307320365",
//       text: "Hello, from Node Express!",
//     })
//     .then(function (message_created) {
//       console.log(message_created);
//     });
// });
