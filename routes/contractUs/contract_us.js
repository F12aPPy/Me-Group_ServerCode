const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');
const http = require("../../config/http");
const controllers = require("../../controllers/index");

router
  .route("/contractUs")
  .get(async (req, res, next) => {
    try {
      const result = await controllers.ContractUs.List();
      if (result) {
        http.response(res, 200, true, "Get successful", result);
      } else {
        http.response(res, 400, false, "Bad request, unable to query data");
      }
    } catch (e) {
      console.log(e);
      http.response(res, 500, false, "Internal server error");
    }
  })
  .post(async (req, res, next) => {
    try {
      const Creating = await controllers.ContractUs.Insert(req.body);
      if (Creating) {
        http.response(res, 201, true, "Created successful");
      } else {
        http.response(res, 400, false, "Bad request, unable to created data");
      }
    } catch (e) {
      console.log(e);
      http.response(res, 500, false, "Internal Server Error");
    }
  });

router.route("/contractUs/:id")
    .put(async (req, res, next) => {
        try {
            const ID = req.params.id;
            const result = await controllers.ContractUs.Update(req.body, ID);
            if (result.affectedRows > 0) {
            http.response(res, 200, true, "Update successful");
            } else {
            http.response(res, 204, false, "No Content, no data in entity");
            }
        } catch (e) {
            console.log(e);
            http.response(res, 500, false, "Internal server error");
        }
        })
    .delete(async (req, res, next) => {
            try {
                const ID = req.params.id
                const result = await controllers.ContractUs.Delete(ID);
                if (result.affectedRows > 0) {
                    http.response(res, 200, true, 'Deleted successful')
                } else {
                    http.response(res, 400, false, 'Bad request, unable to query deleted')
                }
            } catch (e) {
                console.log(e);
                http.response(res, 500, false, 'Internal server error')
            }
        });

module.exports = router;