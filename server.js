const express = require("express");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
const db = require("./models/index"); // import db from models/index.js
const app = express();
const httpServer = require("http").createServer(app);
const port = 8080; // port

//Setting


//listen on server
// db.sequelize.sync({ alter: true }).then(() => { // ตั้ง alter เป็น true ก็ต่อเมื่อต้องการ update database
    httpServer.listen(port, () => {
    console.log("==============================");
    console.log();
    console.log(`Server is running on port ${port}`);
    console.log();
    console.log("==============================");
    });
// });