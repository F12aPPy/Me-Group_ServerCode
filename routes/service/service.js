const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');
const http = require("../../config/http");
const controllers = require("../../controllers/index");
const upload = require("../../middlewares/uploadImg");
const fs = require("fs");

/**
 * @swagger
 * components:
 *  schemas:
 *      Service:
 *          type: object
 *          required:
 *              - createAt
 *              - updateAt
 *              - deletedAt
 *              - service_name
 *              - service_detail
 *              - service_img
 *          properties:
 *              id:
 *                type: int
 *                describtion: The auto-genarate id of Employee
 *              createAt:
 *                type: TIMESTAMP
 *                describtion: Time in Create Employee Data
 *              updateAt:
 *                type: TIMESTAMP
 *                describtion: Time in Update Employee Data
 *              deleteAt:
 *                type: TIMESTAMP
 *                describtion: Time in Delete Employee Data
 *              service_name:
 *                type: string
 *                describtion: Name service
 *              serviece_detail:
 *                type: string
 *                describtion: Detail service
 *              service_img:
 *                type: string
 *                describtion: Image service
 *          example:
 *              service_name: ขายยริการ
 *              service_detail: มีการขายยริการให้เบือกสรรหลายเบอร์
 *              service_img: asd
 *
 */

/**
 * @swagger
 * tags:
 *  name: Services
 *  describtion: The Service API
 */

/**
 * @swagger
 * /services:
 *  get:
 *      summary: Return List of Service
 *      tags: [Services]
 *      responses:
 *          200:
 *              describtion: The List of Service
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Service'
 */
/**
 * @swagger
 * /services:
 *  post:
 *      summary: Create a new Service
 *      tags: [Services]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Service'
 *      responses:
 *          200:
 *              describtion: The Service was successfully create
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Service'
 */

/**
 * @swagger
 * /services/{id}:
 *  put:
 *      summary: Update the service by id
 *      tags: [Services]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Service id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Service'
 *      responses:
 *          200:
 *              description: The Service was Update
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Service'
 *          404:
 *              description: The Service was not found
 */

/**
 * @swagger
 * /services/{id}:
 *  delete:
 *      summary: Delete the service by id
 *      tags: [Services]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Service id
 *      responses:
 *          200:
 *              description: The Service was Update
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Service'
 *          404:
 *              description: The Service was not found
 */

/**
 * @swagger
 * /services/{id}:
 *  get:
 *      summary: Get the service by id
 *      tags: [Services]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Service id
 *      responses:
 *          200:
 *              description: The Service was Update
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Service'
 *          404:
 *              description: The Service was not found
 */

router
  .route("/services")
  .get(async (req, res, next) => {
    try {
      const result = await controllers.services.List();
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
      if (!req.files) {
        const Creating = await controllers.services.Insert(req.body);
        if (Creating) {
          http.response(res, 201, true, "Created successful");
        } else {
          http.response(res, 400, false, "Bad request, unable to created data");
        }
      } else {
        // Save Image
        sampleFile = req.files.service_img;
        uploadPath = __basedir + "/public/photo/services/" + req.body.service_name + ',' + sampleFile.name;

        sampleFile.mv(uploadPath, function (err) {
          if (err) {
            http.response(res, 500, false, err);
          } else {
            console.log("File Was Uploaded");
          }
        });

        const name = req.body.service_name;
        const detail = req.body.service_detail;
        const img = req.files.service_img.name;
        const data = {
          service_name: name,
          service_detail: detail,
          service_img: img,
        };

        const Creating = await controllers.services.Insert(data);
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
  .route("/services/:id")
  .put(async (req, res, next) => {
    try {
      const ID = req.params.id;
      const Insert = await controllers.services.GetbyID(ID);

      if(Insert.service_img != null && req.body.service_name != Insert.service_name) {

        fs.rename(__basedir + '/public/photo/services/' + Insert.service_name + ',' + Insert.service_img , __basedir + '/public/photo/services/' + req.body.service_name + ',' + Insert.service_img , (err) => {
          if (err) throw err;
          console.log('Rename complete!');
        });

      }
       

      const result = await controllers.services.Update(req.body, ID);
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
      const result = await controllers.services.Delete(ID);
      if (result.affectedRows > 0) {
        http.response(res, 200, true, "Deleted successful");
      } else {
        http.response(res, 400, false, "Bad request, unable to query deleted");
      }
    } catch (e) {
      console.log(e);
      http.response(res, 500, false, "Internal server error");
    }
  })
  .get(async (req, res, next) => {
    try {
      const ID = req.params.id;
      const result = await controllers.services.GetbyID(ID);
      if (result) {
        http.response(res, 200, true, "Get successful", result);
      } else {
        http.response(res, 204, false, "No Content, no data in entity");
      }
    } catch (e) {
      console.log(e);
      http.response(res, 500, false, "Internal server error");
    }
  });


router
  .route("/services/image/:id")
  .put(async (req, res, next) => {
    try {
      const ID = req.params.id;

        const fixResult = await controllers.services.GetbyID(ID);
        const file = req.files.service_img;

        if(fixResult.service_img === null) {
          // Save Static Image
        sampleFile = file;
        uploadPath = __basedir + "/public/photo/services/" + fixResult.service_name + sampleFile.name;

        sampleFile.mv(uploadPath, function (err) {
          if (err) {
            http.response(res, 500, false, err);
          } else {
            console.log("File Was Uploaded");
          }
        });
        } else {

          // Delete Static Image
          const PathToDelete =
          __basedir + "/public/photo/services/" + fixResult.service_name + fixResult.service_img;
        fs.unlink(PathToDelete, function (err) {
          if (err) {console.log('Dont Have File in folder')}
        });

        // Save Static Image
        sampleFile = file;
        uploadPath = __basedir + "/public/photo/services/" + fixResult.service_name + sampleFile.name;

        sampleFile.mv(uploadPath, function (err) {
          if (err) {
            http.response(res, 500, false, err);
          } else {
            console.log("File Was Uploaded");
          }
        });

        }

        // Put Data In Database
        const ImgName = {
          service_img: file.name,
        };
        const result = await controllers.services.Update(ImgName, ID);
        if (result.affectedRows > 0) {
          http.response(res, 200, true, "Update successful");
        } else {
          http.response(res, 204, false, "No Content, no data in entity");
        }

    } catch (e) {
      console.log(e);
      http.response(res,500,false, "Internal server error")
    }
  })

module.exports = router;
