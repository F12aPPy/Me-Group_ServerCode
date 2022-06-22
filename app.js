const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const db = require("./models"); // import db from models/index.js
const app = express();
const path = require('path');
global.__basedir = __dirname

// Import Route
const aboutUs = require("./routes/aboutUs/aboutUs");
const aboutUsImg = require("./routes/aboutUsImage/aboutUs_img")
const employee = require("./routes/employee/employee");
const goal = require('./routes/goal/goal');
const service = require('./routes/service/service');
const contractUs = require('./routes/contractUs/contract_us');
const user_admin = require('./routes/user_admin/user_admin');
const mbti = require('./routes/MBTI/mbti');
const role = require('./routes/role/role');
const serviceUs = require('./routes/serviceUs/serviceUs');
const MyBlog = require('./routes/MyBlog/MyBlog');
const Techstack = require('.//routes/Techstack/techstack');
const User_log = require('./routes/user_log/user_log');

// middleware


// Import Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      describtion: "Web Me-Group Enterprise API",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/aboutUs/aboutUs.js",
         "./routes/employee/employee.js",
         "./routes/service/service.js",
         "./routes/goal/goal.js"],
};

const specs = swaggerJsdoc(options);

//Setting
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
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

app.use('/static', express.static(path.join(__dirname,'.','public','photo')))

app.get("/", function (req, res) {
  res.status(200).json("Welcome to MY API");
});

// Use Routes
app.use("/", [aboutUs, aboutUsImg, employee, goal, service, contractUs, user_admin, mbti
              , role, serviceUs, MyBlog, Techstack, User_log]);


module.exports = app;
