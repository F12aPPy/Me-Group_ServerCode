const express = require("express");
const router = express.Router();
const http = require("../../config/http");
const controllers = require("../../controllers/index");


router.route("/user_logs")
    .get(async (req, res, next) => {
        try {
            const result = await controllers.User_log.List();
            if (result) {
              http.response(res, 201, true, "Get successful", result);
            } else {
              http.response(res, 400, false, "Bad request, unable to query data");
            }
          } catch (e) {
            http.response(res, 500, false, "Internal server error");
          }  
    })

module.exports = router