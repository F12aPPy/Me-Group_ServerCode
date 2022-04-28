const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');
const http = require("../../config/http");
const controllers = require("../../controllers/index");

/**
 * @swagger
 * components:
 *  schemas:
 *      Enterprise:
 *          type: object
 *          required:
 *              - createAt
 *              - updateAt
 *              - deletedAt
 *              - enterprise_name
 *              - enterprise_detail
 *              - enterprise_phone
 *              - enterprise_nametax
 *              - enterprise_address
 *          properties:
 *              id:
 *                type: int
 *                describtion: The auto-genarate id of Enterprise
 *              createAt:
 *                type: TIMESTAMP
 *                describtion: Time in Create Enterprise Data
 *              updateAt:
 *                type: TIMESTAMP
 *                describtion: Time in Update Enterprise Data
 *              deleteAt:
 *                type: TIMESTAMP
 *                describtion: Time in Delete Enterprise Data
 *              enterprise_name:
 *                type: string
 *                describtion: Name Enterprise
 *              enterprise_detail:
 *                type: string
 *                describtion: Detail Enterprise
 *              enterprise_phone:
 *                type: string
 *                describtion: Phonnumber Enterprise
 *              enterprise_nametax:
 *                type: string
 *                describtion: Name Tax in Enterprise
 *              enterprise_address:
 *                type: string
 *                describtion: Address Enterprise
 *          example:
 *              enterprise_name: Anfa&friend
 *              enterprise_detail: A Drug Sore in Korat
 *              enterprise_phone: "0933207404"
 *              enterprise_nametax: makawan thojan
 *              enterprise_address: 88/33 sanambin.road kalasin city 46000
 *
 */

/**
 * @swagger
 * tags:
 *  name: Enterprise
 *  describtion: The Enterprise API
 */

/**
 * @swagger
 * /enterprises:
 *  get:
 *      summary: Return List of Enterprise
 *      tags: [Enterprise]
 *      responses:
 *          200:
 *              describtion: The List of Enterprise
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Enterprise'
 */

/**
 * @swagger
 * /enterprises:
 *  post:
 *      summary: Create a new Enterprise
 *      tags: [Enterprise]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Enterprise'
 *      responses:
 *          200:
 *              describtion: The Enterprise was successfully create
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Enterprise'
 */

router
  .route("/enterprises")
  .get(async (req, res, next) => {
    try {
      const result = await controllers.enterprises.List();
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
      const data = req.body;
      if (!req.files) {
        const Creating = await controllers.enterprises.Insert(data);
        if (Creating) {
          http.response(res, 201, true, "Created successful");
        } else {
          http.response(res, 400, false, "Bad request, unable to created data");
        }
      } else if ((req.files.enterprise_img).length > 1) {

        const multiFiles = req.files.enterprise_img;
        let promises = [];
        var allAboutUsImgName = [];

        // Save Images
        multiFiles.forEach((file) => {
          const savePath = __basedir + "/public/photo/aboutUs/" + file.name;
          allAboutUsImgName.push(file.name);
          promises.push(file.mv(savePath));
        });

        await Promise.all(promises);

        // Input Data
        const InputData = {
          enterprise_name : data.enterprise_name,
          enterprise_surname: data.enterprise_surname,
          enterprise_detail: data.enterprise_detail,
          enterprise_phone: data.enterprise_phone,
          enterprise_address: data.enterprise_address,
          enterprise_img: JSON.stringify(allAboutUsImgName),
        }
        const Creating = await controllers.enterprises.Insert(InputData);
        if (Creating) {
          http.response(res, 201, true, "Created successful");
        } else {
          http.response(res, 400, false, "Bad request, unable to created data");
        }
      } else {

        // Save Image
        sampleFile = req.files.enterprise_img;
        uploadPath = __basedir + "/public/photo/aboutUs/" + sampleFile.name;

        sampleFile.mv(uploadPath, function (err) {
          if (err) {
            http.response(res, 500, false, err);
          } else {
            console.log("File Was Uploaded");
          }
        });

        // Input Data
        const InputData = {
          enterprise_name : data.enterprise_name,
          enterprise_surname: data.enterprise_surname,
          enterprise_detail: data.enterprise_detail,
          enterprise_phone: data.enterprise_phone,
          enterprise_address: data.enterprise_address,
          enterprise_img: sampleFile.name,
        }
        const Creating = await controllers.enterprises.Insert(InputData);
        if (Creating) {
          http.response(res, 201, true, "Created successful");
        } else {
          http.response(res, 400, false, "Bad request, unable to created data");
        }

      }
    } catch (e) {
      console.log(e);
      http.response(res, 500, false, "Internal Server Error");
    }
  });

router
  .route("/enterprises/:id")
  .put(async (req, res, next) => {
    try {
      const ID = req.params.id;
      const result = await controllers.enterprises.Update(req.body, ID);
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
      const ID = req.params.id;
      const result = await controllers.enterprises.Delete(ID);
      if (result.affectedRows > 0) {
        http.response(res, 200, true, "Deleted successful");
      } else {
        http.response(res, 400, false, "Bad request, unable to query deleted");
      }
    } catch (e) {
      console.log(e);
      http.response(res, 500, false, "Internal server error");
    }
  });

module.exports = router;
