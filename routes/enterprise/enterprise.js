const express = require('express')
const router = express.Router()
// const bcrypt = require('bcrypt');
const http = require('../../config/http');
const controllers = require('../../controllers/index');

router.route('/enterprises')
    .get(async (req, res, next) => {
        try {
            const result = await controllers.enterprises.List();
            if (result) {
                http.response(res, 200, true, 'Get successful', result)
            } else {
                http.response(res, 400, false, 'Bad request, unable to query data')
            }
        } catch (e) {
            console.log(e);
            http.response(res, 500, false, 'Internal server error')
        }
    })

module.exports = router;