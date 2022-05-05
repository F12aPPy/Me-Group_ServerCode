const con = require("../../config/db");




Insert = (values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "INSERT INTO Role SET ?";
      const result = await con.query(sql, [values]);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

List = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT *
                     FROM Role r
                     WHERE r.deleted_at IS NULL`;
      const result = await con.query(sql, []);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
    Insert,
    List,
};