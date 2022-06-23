const express = require("express");
const router = express.Router();
const http = require("../../config/http");
const authorization = require("../../middlewares/authorize");

router.route("/check-login")
    .get(authorization,async (req, res, next) => {
        http.response(res, 201, true, "Login")
    })

module.exports = router