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
 *              deleted_at: null
 *              employee_name: makawan thojan
 *              employee_detail: นักศึกษาฝึกงาน
 *              facebook: makawan thojan
 *              instargram: makawan thojan
 *              github: http://github.com/anfamakawan
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
      const Creating = await controllers.employees.Insert(req.body);
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

module.exports = router;