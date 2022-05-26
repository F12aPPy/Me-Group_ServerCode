const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');
const http = require("../../config/http");
const controllers = require("../../controllers/index");
const fs = require("fs");
const authorization = require('../../middlewares/authorize')

router
  .route("/serviceUs")
  .get(async (req, res, next) => {
    try {
      const result = await controllers.serviceUs.List();
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
      if (!req.files) {
        const Creating = await controllers.serviceUs.Insert(req.body);
        if (Creating) {
          http.response(res, 201, true, "Created successful");
        } else {
          http.response(res, 400, false, "Bad request, unable to created data");
        }
      } else {
        // Save Image
        sampleFile = req.files.service_img;
        uploadPath = __basedir + "/public/photo/serviceUs/" + req.body.serviceUs_name + ',' + sampleFile.name;

        sampleFile.mv(uploadPath, function (err) {
          if (err) {
            http.response(res, 500, false, err);
          } else {
            console.log("File Was Uploaded");
          }
        });

        const serviceUs_name = req.body.serviceUs_name;
        const detail = req.body.serviceUs_detail;
        const img = req.files.serviceUs_img.name;
        const data = {
          serviceUs_name: serviceUs_name,
          serviceUs_detail: detail,
          serviceUs_img: img,
        };

        const Creating = await controllers.serviceUs.Insert(data);
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
  .route("/serviceUs/:id")
  .put(authorization,async (req, res, next) => {
    try {
      const ID = req.params.id;
      const Insert = await controllers.serviceUs.GetbyID(ID);

      if(Insert.service_img != null && req.body.serviceUs_name != Insert.serviceUs_name) {

        fs.rename(__basedir + '/public/photo/serviceUs/' + Insert.serviceUs_name + ',' + Insert.serviceUs_img , __basedir + '/public/photo/serviceUs/' + req.body.serviceUs_name + ',' + Insert.serviceUs_img , (err) => {
          if (err) throw err;
          console.log('Rename complete!');
        });

      }
       

      const result = await controllers.serviceUs.Update(req.body, ID);
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
      const ID = req.params.id;
      const DeleteImgResult = await controllers.serviceUs.GetbyID(ID);

      if(DeleteImgResult.serviceUs_img != null) {
        // Delete Static Image
        const PathToDelete = __basedir + "/public/photo/serviceUs/" + DeleteImgResult.service_name + ',' + DeleteImgResult.service_img;
        fs.unlink(PathToDelete, function (err) {
          if (err) {console.log('Dont Have File in folder')}
        });
      }

      const result = await controllers.serviceUs.Delete(ID);
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
      const result = await controllers.serviceUs.GetbyID(ID);
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
  .route("/serviceUs/image/:id")
  .put(authorization,async (req, res, next) => {
    try {
      const ID = req.params.id;

        const fixResult = await controllers.serviceUs.GetbyID(ID);
        const file = req.files.serviceUs_img;

        if(fixResult.serviceUs_img === null) {
          // Save Static Image
        sampleFile = file;
        uploadPath = __basedir + "/public/photo/serviceUs/" + fixResult.serviceUs_name + ',' + sampleFile.name;

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
          __basedir + "/public/photo/serviceUS/" + fixResult.serviceUs_name + ',' + fixResult.serviceUs_img;
        fs.unlink(PathToDelete, function (err) {
          if (err) {console.log('Dont Have File in folder')}
        });

        // Save Static Image
        sampleFile = file;
        uploadPath = __basedir + "/public/photo/serviceUS/" + fixResult.serviceUs_name + ',' + sampleFile.name;

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
          serviceUs_img: file.name,
        };
        const result = await controllers.serviceUs.Update(ImgName, ID);
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
