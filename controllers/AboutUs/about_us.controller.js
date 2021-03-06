const con = require("../../config/db");

Insert = (values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "INSERT INTO AboutUs SET ?";
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
      const sql = "UPDATE AboutUs SET ? WHERE id=?";
      const result = await con.query(sql, [values, ID]);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

Get = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT *
                     FROM AboutUs a
                     WHERE a.deleted_at IS NULL`;
      const result = await con.query(sql, []);
      resolve(result[0]);
    } catch (e) {
      reject(e);
    }
  });
};

// GetByID = (ID) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const sql = ` SELECT a.id, a.enterprise_name
//                       FROM AboutUs a
//                       WHERE a.id=? `;
//       const result = await con.query(sql, [ID]);
//       resolve(result[0]);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// Delete = (ID) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const sql = "UPDATE AboutUs SET deleted_at=NOW() WHERE id=?";
//       const result = await con.query(sql, [ID]);
//       resolve(result);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

module.exports = {
    Insert,
    Update,
    Get,
};