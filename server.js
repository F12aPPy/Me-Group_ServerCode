const http = require("http");

const app = require("./app");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const db = require('./models');

//Setting

// เรียกใช้งาน Index router

//listen on server
// db.sequelize.sync({ alter: true }).then(() => { // ตั้ง alter เป็น true ก็ต่อเมื่อต้องการ update database
server.listen(PORT, () => {
  console.log("==============================");
  console.log();
  console.log(`Server is running on port ${PORT}`);
  console.log();
  console.log("==============================");
});
// });