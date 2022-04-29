const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');
const http = require("../../config/http");
const controllers = require("../../controllers/index");

/**
 * @swagger
 * components:
 *  schemas:
 *      Employee:
 *          type: object
 *          required:
 *              - createAt
 *              - updateAt
 *              - deletedAt
 *              - employee_name
 *              - employee_detail
 *              - facebook
 *              - instargram
 *              - github
 *              - image
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
 *              employee_name:
 *                type: string
 *                describtion: Name employee
 *              employee_detail:
 *                type: string
 *                describtion: Detail employee
 *              facebook:
 *                type: string
 *                describtion: Phonnumber employee
 *              instargram:
 *                type: string
 *                describtion: Name Tax in employee
 *              github:
 *                type: string
 *                describtion: Address employee
 *          example:
 *              employee_first_name: makawan thojan
 *              employee_last_name: นักศึกษาฝึกงาน
 *              mbti_id: 1
 *              emp_contract: makawan thojan
 *              emp_class: เด็กล้างจาน
 *              image: abc
 *
 */

/**
 * @swagger
 * tags:
 *  name: Employees
 *  describtion: The Employee API
 */

/**
 * @swagger
 * /employees:
 *  get:
 *      summary: Return List of Employee
 *      tags: [Employees]
 *      responses:
 *          200:
 *              describtion: The List of Employee
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Employee'
 */

/**
 * @swagger
 * /employees:
 *  post:
 *      summary: Create a new Enterprise
 *      tags: [Employees]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Employee'
 *      responses:
 *          200:
 *              describtion: The Employee was successfully create
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Employee'
 */

/**
 * @swagger
 * /employees/{id}:
 *  put:
 *      summary: Update the employee by id
 *      tags: [Employees]
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
 *                      $ref: '#/components/schemas/Employee'
 *      responses:
 *          200:
 *              description: The Service was Update
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Employee'
 *          404:
 *              description: The Employee was not found
 */

/**
 * @swagger
 * /employees/{id}:
 *  delete:
 *      summary: Employee the service by id
 *      tags: [Employees]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The Employee id
 *      responses:
 *          200:
 *              description: The Employee was Update
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Employee'
 *          404:
 *              description: The Employee was not found
 */



router
  .route("/employees")
  .get(async (req, res, next) => {
    try {
      const result = await controllers.employees.List();
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
        const Creating = await controllers.employees.Insert(req.body);
        if (Creating) {
          http.response(res, 201, true, "Created successful");
        } else {
          http.response(res, 400, false, "Bad request, unable to created data");
        }
      } else {
        // Save Image
        sampleFile = req.files.emp_img;
        uploadPath = __basedir + "/public/photo/employees/" + req.body.emp_first_name + req.body.emp_last_name + sampleFile.name;

        sampleFile.mv(uploadPath, function (err) {
          if (err) {
            http.response(res, 500, false, err);
          } else {
            console.log("File Was Uploaded");
          }
        });

        const name = req.body.emp_first_name;
        const lastname = req.body.emp_last_name;
        const mbti_id = req.body.mbti_id;
        const Eclass = req.body.emp_class;
        const Equote = req.body.emp_quote;
        const contract = req.body.emp_contract;
        const img = req.files.emp_img.name;
        const data = {
          emp_first_name: name,
          emp_last_name: lastname,
          mbti_id: mbti_id,
          emp_class: Eclass,
          emp_quote: Equote,
          emp_contract: contract,
          emp_img: img,
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

router.route("/employees/:id")
    .put(async (req, res, next) => {
        try {
            const ID = req.params.id;
            const result = await controllers.employees.Update(req.body, ID);
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
                const result = await controllers.employees.Delete(ID);
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

router
  .route("/employees/image/:id")
  .put(async (req, res, next) => {
    try {
      const ID = req.params.id;

        const fixResult = await controllers.employees.GetbyID(ID);
        const file = req.files.emp_img;

        if(fixResult.emp_img === null) {
          // Save Static Image
        sampleFile = file;
        uploadPath = __basedir + "/public/photo/employees/" + fixResult.emp_first_name + fixResult.emp_last_name + sampleFile.name;

        sampleFile.mv(uploadPath, function (err) {
          if (err) {
            http.response(res, 500, false, err);
          } else {
            console.log("File Was Uploaded");
          }
        });
        } else {

          // Delete Static Image
          const PathToDelete = __basedir + "/public/photo/employees/" + fixResult.emp_first_name + fixResult.emp_last_name + fixResult.emp_img;
        fs.unlink(PathToDelete, function (err) {
          if (err) {console.log('Dont Have File in folder')}
        });

        // Save Static Image
        sampleFile = file;
        uploadPath = __basedir + "/public/photo/employees/" + fixResult.emp_first_name + fixResult.emp_last_name + sampleFile.name;

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
          emp_img: file.name,
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