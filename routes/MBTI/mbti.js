const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');
const http = require("../../config/http");
const controllers = require("../../controllers/index");

router
  .route("/mbti")
  .get(async (req, res, next) => {
    try {
      const result = await controllers.mbti.Get();
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
      const Creating = await controllers.mbti.Insert(req.body);
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

module.exports = router;