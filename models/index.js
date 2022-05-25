"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "../../config/config.json")[env];
const db = {};
const directories = [
  "./employee/employee.model.js",
  "./about_us/about_us.model.js",
  "./goal/goal.model.js",
  "./service/service.model.js",
  "./MBTI/mbti.model.js",
  "./contract_us/contract_us.model.js",
  "./user_admin/admin.model.js",
  "./role/role.model.js",
  "./about_us_image/about_us_image.model.js",
  "./serviceUs/serviceUs.model.js"
];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = directories.map((file) =>
      require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Services = require('./service/service.model')(sequelize, Sequelize);

module.exports = db;
