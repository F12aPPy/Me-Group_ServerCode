const con = require("../../config/db");

Insert = (values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "INSERT INTO Employee SET ?";
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
      const sql = "UPDATE Employee SET ? WHERE employee_id=?";
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
                     FROM Employee e left join Mbti m on
                     e.mbti_id = m.id
                     WHERE e.deleted_at IS NULL`;
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
                      FROM Employee e left join Mbti m on
                      e.mbti_id = m.id
                      WHERE e.employee_id=? `;
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
      const sql = "UPDATE Employee SET deleted_at=NOW() WHERE employee_id=?";
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
    Delete
};