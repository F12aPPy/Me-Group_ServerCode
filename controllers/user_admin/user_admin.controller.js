const con = require("../../config/db");

Insert = (values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "INSERT INTO User_admin SET ?";
      const result = await con.query(sql, [values]);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

Update = (values, ID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "UPDATE User_admin SET ? WHERE user_id=?";
      const result = await con.query(sql, [values, ID]);
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
                     FROM User_admin u
                     WHERE u.deleted_at IS NULL`;
      const result = await con.query(sql, []);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

GetByID = (ID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = ` SELECT *
                      FROM User_admin u
                      WHERE u.user_id=? `;
      const result = await con.query(sql, [ID]);
      resolve(result[0]);
    } catch (e) {
      reject(e);
    }
  });
};

GetByUsername = (Username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = ` SELECT u.user_id, u.Uadmin_username, u.Uadmin_password
                    FROM User_admin u
                    WHERE u.Uadmin_username=? AND u.deleted_at IS NULL `
      const result = await con.query(sql, [Username]);
      resolve(result[0]);
    } catch (e) {
      reject(e);
    }
  });
};

Delete = (ID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "UPDATE User_admin SET deleted_at=NOW() WHERE user_id=?";
      const result = await con.query(sql, [ID]);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
    Insert,
    Update,
    List,
    GetByID,
    Delete,
    GetByUsername,
};