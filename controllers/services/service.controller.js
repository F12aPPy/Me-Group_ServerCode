const con = require("../../config/db");




Insert = (values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "INSERT INTO Service SET ?";
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
      const sql = "UPDATE Service SET ? WHERE id=?";
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
                     FROM Service s
                     WHERE s.deleted_at IS NULL`;
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
                      FROM Service s
                      WHERE s.id=? `;
      const result = await con.query(sql, [ID]);
      resolve(result[0]);
    } catch (e) {
      reject(e);
    }
  });
};

Delete = (ID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "UPDATE Service SET deleted_at=NOW() WHERE id=?";
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
};