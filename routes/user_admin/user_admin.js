const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken') // ใช้งาน jwt module
const http = require("../../config/http");
const fs = require('fs');
const controllers = require("../../controllers/index");
const authorization = require("../../middlewares/authorize");

router
  .route("/user")
  .get(async (req, res, next) => {
    try {
      const result = await controllers.user_admin.List();
      if (result) {
        // delete result.Uadmin_password
        http.response(res, 200, true, "Get successful", result);
      } else {
        http.response(res, 400, false, "Bad request, unable to query data");
      }
    } catch (e) {
      console.log(e);
      http.response(res, 500, false, "Internal server error");
    }
  })
  .post(authorization, async (req, res, next) => {
    try {
      console.log("Use POST user !!")
      const user = await controllers.user_admin.GetByUsername(req.body.Uadmin_username);
      if (user) {
        http.response(res, 404, false, 'Username is duplicate')
        return
      }else {
        const saltRounds = 12;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          if(salt) {
            bcrypt.hash(req.body.Uadmin_password, salt).then(async function(hash) {
              if (hash) {
                req.body.Uadmin_password = hash
                req.body.created_at = new Date()
                const Creating = await controllers.user_admin.Insert(req.body);
                if (Creating) {
                  http.response(res, 201, true, "Created successful");
                } else {
                  http.response(res, 400, false, "Bad request, unable to created data");
                }
              } else {
                http.response(res, 404, false, 'Server error, unable encryption password');
              }
            });
          } else {
            http.response(res, 404, false, 'Server error, unable gen salt password')
          }
        })
      }
    } catch (e) {
      console.log(e);
      http.response(res, 500, false, "Internal Server Error");
    }
  });

router.route("/user/:id")
    .put(authorization, async (req, res, next) => {
        try {
            const ID = req.params.id;
            const saltRounds = 12;
            bcrypt.genSalt(saltRounds, function (err, salt) {
              if(salt) {
                bcrypt.hash(req.body.Uadmin_password, salt).then(async function(hash) {
                  if (hash) {
                    req.body.Uadmin_password = hash
                    req.body.updated_at = new Date()
                      const result = await controllers.user_admin.Update(req.body, ID);
                      if (result.affectedRows > 0) {
                        http.response(res, 200, true, "Update successful");
                      } else {
                        http.response(res, 204, false, "No Content, no data in entity");
                      }
                  }
              })
              } else {
                http.response(res, 404, false, 'Server error, unable gen salt password')
              }
            })
            
        } catch (e) {
            console.log(e);
            http.response(res, 500, false, "Internal server error");
        }
        })
    .delete(authorization,async (req, res, next) => {
            try {
                const ID = req.params.id
                const result = await controllers.user_admin.Delete(ID);
                if (result.affectedRows > 0) {
                    http.response(res, 200, true, 'Deleted successful')
                } else {
                    http.response(res, 400, false, 'Bad request, unable to query deleted')
                }
            } catch (e) {
                console.log(e);
                http.response(res, 500, false, 'Internal server error')
            }
        })
    .get(authorization, async (req, res, next) => {
          try {
              const ID = req.params.id
              const result = await controllers.user_admin.GetByID(ID);
              if (result) {
                  delete result.Uadmin_password
                  http.response(res, 200, true, 'Get successful', result)
              } else {
                  http.response(res, 204, false, 'No Content, no data in entity')
              }
          } catch (e) {
              console.log(e);
              http.response(res, 500, false, 'Internal server error')
          }
    })

router.route('/user/signin')
  .post(async (req, res, next) => {
      try {
        const result = await controllers.user_admin.GetByUsername(req.body.Uadmin_username);
          if (result) {
            bcrypt.compare(req.body.Uadmin_password, result.Uadmin_password).then(async function (match) {
              if (match) {
                const privateKey = fs.readFileSync(__basedir + '/config/private.key')
                var AccessToken = jwt.sign({
                  "Sub": "Admin_Megroup", // ตั้งชื่อ Token
                  "ID": result.user_id, // ข้อมูลที่จะนำไปใส่ใน token แนะนำเป็น ID ของ user
                }, privateKey, { expiresIn: '1h' }); // ตั้งเวลา token
                var token = {
                  token_type: 'Bearer',
                  access_token: AccessToken
                }
                delete result.password
                http.response(res, 200, true, 'Sign-in successful', result, token);
                } else {
                   http.response(res, 404, false, 'Password is incorrect');
                  }
                });
            } else {
                http.response(res, 404, false, 'This account is not administrator')
            }
        } catch (e) {
            console.log(e);
            http.response(res, 500, false, 'Internal server error')
        }
    })

module.exports = router;