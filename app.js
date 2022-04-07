const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const db = require("./models"); // import db from models/index.js
const app = express();

// Import Route
const enterprise = require("./routes/enterprise/enterprise");
const employee = require("./routes/employee/employee");
const goal = require('./routes/goal/goal');
const service = require('./routes/service/service');

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
  apis: ["./routes/enterprise/enterprise.js",
         "./routes/employee/employee.js",
         "./routes/service/service.js",
         "./routes/goal/goal.js"],
};

const specs = swaggerJsdoc(options);

//Setting
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

app.get("/", function (req, res) {
  res.status(200).json("Welcome to MY API");
});
app.use("/", [enterprise, employee, goal, service]);

module.exports = app;
