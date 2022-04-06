const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const db = require("./models"); // import db from models/index.js
const app = express();

// Import Route
const enterprise = require('./routes/enterprise/enterprise');
//Setting
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5 })
);
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(async (req, res, next) => {
  // var allowedOrigins = [];
  // var origin = req.headers.origin;
  // res.header("Access-Control-Allow-Credentials", true);
  // if (allowedOrigins.indexOf(origin) > -1) {
  //     res.setHeader('Access-Control-Allow-Origin', origin ? origin : '*');
  // }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTION");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Option, Authorization"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200); //200 is OK
  } else {
    next();
  }
});

app.get("/", function (req, res) {
  res.status(200).json("Welcome to MY API");
});
app.use("/", [
    enterprise
]);

module.exports = app;
