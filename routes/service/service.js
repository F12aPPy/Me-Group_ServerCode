const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');
const http = require("../../config/http");
const controllers = require("../../controllers/index");
const fs = require("fs");
const authorization = require('../../middlewares/authorize')
const { Storage } = require('@google-cloud/storage')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config();

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
  .post(authorization, async (req, res, next) => {

    // Setting Bucket Project
    const storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT,
      credentials: {
      client_email: process.env.GCLOUD_CLIENT_EMAIL,
      private_key: process.env.GCLOUD_PRIVATE_KEY
      }
  });
    const bucket = storage.bucket(process.env.GCS_BUCKET);
    // End setting

    try {
      // When Don't Have file
      if (!req.files) {
        const Creating = await controllers.services.Insert(req.body);
        if (Creating) {
          http.response(res, 201, true, "Created successful");
        } else {
          http.response(res, 400, false, "Bad request, unable to created data");
        }
      } else {
        // When Have File
        // Set File name and contents data 
        const fileName = uuidv4() + "-" + req.files.service_img.name
        const contents = req.files.service_img.data
        // Create Bucket Path to Upload in Google Cloud
        const file = bucket.file(`image/services/${fileName}`)
        // Upload to Google cloud
        file.save(contents, async function(err) {
          // if Save To Cloud Success
          if(!err) {            
            // Edit data to save to Database
            const Data = req.body
            Data.service_img = file.metadata.name
            // Store Data to Database
            const Creating = await controllers.services.Insert(Data);
            if (Creating) {
              http.response(res, 201, true, "Created Successful");
            } else {
              http.response(res, 400, false, "Bad request, unable to created data");
            }
          } // end save to database
        }) // end save file
      } // Finish Save Image and Data
    } catch (e) {
      console.log(e);
      http.response(res, 500, false, "Internal Server Error");
    }
  });

router
  .route("/services/:id")
  .put(authorization, async (req, res, next) => {

    // Setting Bucket Project and ID 
    const ID = req.params.id;
    const storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT,
      credentials: {
      client_email: process.env.GCLOUD_CLIENT_EMAIL,
      private_key: process.env.GCLOUD_PRIVATE_KEY
      }
    });
    const bucket = storage.bucket(process.env.GCS_BUCKET);
    const GetDataByID = await controllers.services.GetbyID(ID);
    // End setting
    try {
      // Check Have request file 
      if(!req.files){
        const Put = await controllers.services.Update(req.body, ID)
        if(Put) {
          http.response(res, 200, true, "Updated Successful")
        } else {
          http.response(res, 400, false, "Bad request, unable to updated data");
        }
      } else {
        // When Have File
        // Set File name and contents data 
        const fileName = uuidv4() + "-" + req.files.service_img.name
        const contents = req.files.service_img.data
        // Create Bucket Path to Upload in Google Cloud
        const file = bucket.file(`image/services/${fileName}`)
        // Upload to Google cloud
        file.save(contents, async function(err) {
          // if Save To Cloud Success
          if(!err) {
            // Delete Image in Cloud Storage
            const FileToDelete = await bucket.file(`${GetDataByID.service_img}`)
            FileToDelete.delete(function(err, apiResponse) { if(err){console.log(err)} }); 
            // Edit data to save to Database
            const Data = req.body
            Data.service_img = file.metadata.name
            // Store Data to Database
            const Edited = await controllers.services.Update(Data, ID);
            if (Edited) {
              http.response(res, 201, true, "Edited Successful");
            } else {
              http.response(res, 400, false, "Bad request, unable to edited data");
            }
          } // end save to database
        }) // end save file
      } // Finist Save and Edit Image and Data to Database
    } catch (e) {
      http.response(res, 500, false, "Internal server error");
    }
  })
  .delete(authorization, async (req, res, next) => {
     // Setting Bucket Project and ID 
     const ID = req.params.id;
     const storage = new Storage({
       projectId: process.env.GCLOUD_PROJECT,
       credentials: {
       client_email: process.env.GCLOUD_CLIENT_EMAIL,
       private_key: process.env.GCLOUD_PRIVATE_KEY
       }
     });
     const bucket = storage.bucket(process.env.GCS_BUCKET);
     const GetDataByID = await controllers.services.GetbyID(ID);
     // End setting
    try {
      //Check Image In Database
      if(GetDataByID.service_img != null) {
       // Delete Image in Google Cloud Storage
       const FileToDelete = bucket.file(`${GetDataByID.service_img}`)
       FileToDelete.delete(function(err, apiResponse) { if(err){console.log(err)} }); 
      }
      // set Delete Time in Database
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
  .put(authorization,async (req, res, next) => {
    
    try {
      const ID = req.params.id;

        const fixResult = await controllers.services.GetbyID(ID);
        const file = req.files.service_img;

        if(fixResult.service_img === null) {
          // Save Static Image
        sampleFile = file;
        uploadPath = __basedir + "/public/photo/services/" + fixResult.service_name + ',' + sampleFile.name;

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
          __basedir + "/public/photo/services/" + fixResult.service_name + ',' + fixResult.service_img;
        fs.unlink(PathToDelete, function (err) {
          if (err) {console.log('Dont Have File in folder')}
        });

        // Save Static Image
        sampleFile = file;
        uploadPath = __basedir + "/public/photo/services/" + fixResult.service_name + ',' + sampleFile.name;

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

router.route("/services/image1")
  .post(async (req, res, next) => {
    // Setting Bucket Project
    const storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT,
      credentials: {
      client_email: process.env.GCLOUD_CLIENT_EMAIL,
      private_key: process.env.GCLOUD_PRIVATE_KEY
      }
    });
    const bucket = storage.bucket(process.env.GCS_BUCKET);
    // End setting
    try {
      // Check Have request file 
      if(!req.files){
        const Create = await controllers.services.Update(req.body, ID)
        if(Create) {
          http.response(res, 200, true, "Created Successful")
        } else {
          http.response(res, 400, false, "Bad request, unable to created data");
        }
      } else {
        // When Have File
        // Set File name and contents data 
        const fileName = uuidv4() + "-" + req.files.service_img.name
        const contents = req.files.service_img.data
        // Create Bucket Path to Upload in Google Cloud
        const file = bucket.file(`image/eiei/${fileName}`)
        // Upload to Google cloud
        file.save(contents)
        // Edit data to save to Database
        const Data = req.body
        // console.log(file.name)
        Data.service_img = await file.name
        // Store Data to Database
        const Creating = await controllers.services.Insert(Data);
        if (Creating) {
          http.response(res, 201, true, "Created Successful");
        } else {
          http.response(res, 400, false, "Bad request, unable to created data");
        }
      }
    } catch (error) {
      http.response(res, 500, false, "Internal Server Error")
    }
  })

module.exports = router;
