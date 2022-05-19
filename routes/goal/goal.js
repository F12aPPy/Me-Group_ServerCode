const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');
const http = require("../../config/http");
const controllers = require("../../controllers/index");
const fs = require('fs');
const authorization = require('../../middlewares/authorize')



/**
 * @swagger
 * components:
 *  schemas:
 *      Goal:
 *          type: object
 *          required:
 *              - createAt
 *              - updateAt
 *              - deletedAt
 *              - goal_title
 *              - goal_detail
 *              - goal_img
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
 *              goal_title:
 *                type: string
 *                describtion: Name service
 *              goal_detail:
 *                type: text
 *                describtion: Detail service
 *              goal_img:
 *                type: text
 *                describtion: Image service
 *          example:
 *              goal_title: บริการขายยริการอันดับ 1
 *              goal_detail: ได้รับรางวัลการบริการอันดับ 1 กับร้านใกล้เคียงในโคราช
 *              goal_img: asd
 *              service_id: 1
 *
 */

/**
 * @swagger
 * tags:
 *  name: Goals
 *  describtion: The Goal API
 */

/**
 * @swagger
 * /goals:
 *  get:
 *      summary: Return List of Goal
 *      tags: [Goals]
 *      responses:
 *          200:
 *              describtion: The List of Goal
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Goal'
 */
/**
 * @swagger
 * /goals:
 *  post:
 *      summary: Create a new Goal
 *      tags: [Goals]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Goal'
 *      responses:
 *          200:
 *              describtion: The Goal was successfully create
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Goal'
 */

/**
 * @swagger
 * /goals/{id}:
 *  put:
 *      summary: Update the goal by id
 *      tags: [Goals]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Goal id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Goal'
 *      responses:
 *          200:
 *              description: The Goal was Update
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Goal'
 *          404:
 *              description: The Goal was not found
 */

/**
 * @swagger
 * /goals/{id}:
 *  delete:
 *      summary: Delete the goal by id
 *      tags: [Goals]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Service id
 *      responses:
 *          200:
 *              description: The Goal was Update
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Goal'
 *          404:
 *              description: The Goal was not found
 */


router
  .route("/goals")
  .get(async (req, res, next) => {
    try {
      const result = await controllers.goals.List();
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
  .post(authorization,async (req, res, next) => {
    try {

      //save image 
      if (!req.files | (Object.keys(req.files) === 0)) {
        return http.response(res, 400, false, "No file were uploaded.");
      } else {
        sampleFile = req.files.goal_img;
        uploadPath = __basedir + "/public/photo/goals/" + req.body.goal_title + ',' + sampleFile.name;

        sampleFile.mv(uploadPath, function (err) {
          if (err) {
            http.response(res, 500, false, err);
          } else {
            console.log("File Was Uploaded");
          }
        });
      }

      const data = {
        goal_title: req.body.goal_title,
        goal_detail: req.body.goal_detail,
        goal_img: req.files.goal_img.name,
        service_id: req.body.service_id,
      }
      console.log(data)
      const Creating = await controllers.goals.Insert(data);
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

router.route("/goals/:id")
    .put(authorization,async (req, res, next) => {
        try {
            const ID = req.params.id;

            const Insert = await controllers.goals.GetbyID(ID);

            if(Insert.goal_img != null && req.body.goal_title != Insert.goal_title) {

              fs.rename(__basedir + '/public/photo/goals/' + Insert.goal_title + ',' + Insert.goal_img , __basedir + '/public/photo/goals/' + req.body.goal_title + ',' + Insert.goal_img , (err) => {
                if (err) throw err;
                console.log('Rename complete!');
              });

            }

            const result = await controllers.goals.Update(req.body, ID);
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
    .delete(authorization,async (req, res, next) => {
            try {
                const ID = req.params.id

                const DeleteImgResult = await controllers.goals.GetbyID(ID);

                if(DeleteImgResult.goal_img != null) {
                  // Delete Static Image
                  const PathToDelete = __basedir + "/public/photo/goals/" + DeleteImgResult.goal_title + ',' + DeleteImgResult.goal_img;
                  fs.unlink(PathToDelete, function (err) {
                    if (err) {console.log('Dont Have File in folder')}
                  });
                }

                const result = await controllers.goals.Delete(ID);
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
      .get(async (req, res, next) => {
          try {
            const ID = req.params.id;
            const result = await controllers.goals.GetbyID(ID);
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
        
router.route("/goals/image/:id")
        .put(async (req, res, next) => {
          try {
            const ID = req.params.id;
      
              const fixResult = await controllers.goals.GetbyID(ID);
              const file = req.files.goal_img;
      
              if(fixResult.goal_img === null) {
                // Save Static Image
              sampleFile = file;
              uploadPath = __basedir + "/public/photo/goals/" + fixResult.goal_title + ',' + sampleFile.name;
      
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
                __basedir + "/public/photo/goals/" + fixResult.goal_title + ',' + fixResult.goal_img;
              fs.unlink(PathToDelete, function (err) {
                if (err) {console.log('Dont Have File in folder')}
              });
      
              // Save Static Image
              sampleFile = file;
              uploadPath = __basedir + "/public/photo/goals/" + fixResult.goal_title + ',' + sampleFile.name;
      
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
                goal_img: file.name,
              };
              const result = await controllers.goals.Update(ImgName, ID);
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
router
  .route("/webgoals")
  .get(async (req, res, next) => {
    try {
      const result = await controllers.goals.WebList();
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

module.exports = router;