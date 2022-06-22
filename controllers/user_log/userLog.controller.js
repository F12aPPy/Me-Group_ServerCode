const con = require("../../config/db");

Insert = (values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "INSERT INTO User_log SET ?";
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
                    FROM User_log ul left join User_admin ua on
                    ul.user_id = ua.user_id
                    WHERE g.deleted_at IS NULL`;
      const result = await con.query(sql, []);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

Delete = (ID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "UPDATE User_log SET deleted_at=NOW() WHERE id=?";
      const result = await con.query(sql, [ID]);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
    Insert,
    List,
    Delete
};