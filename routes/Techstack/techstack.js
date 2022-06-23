const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');
const http = require("../../config/http");
const controllers = require("../../controllers/index");
const fs = require("fs");
const authorization = require('../../middlewares/authorize')

router
  .route("/techstacks")
  .get(async (req, res, next) => {
    try {
      const result = await controllers.Techstack.List();
      if (result) {
        http.response(res, 201, true, "Get successful", result);
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
        const Creating = await controllers.Techstack.Insert(req.body);
        if (Creating) {
          http.response(res, 201, true, "Created successful");
        } else {
          http.response(res, 400, false, "Bad request, unable to created data");
        }
      } else {

        // Save Image
        sampleFile = req.files.techstack_img;
        uploadPath = __basedir + "/public/photo/techstacks/" + req.body.techstack_name + ',' + sampleFile.name;

        sampleFile.mv(uploadPath, function (err) {
          if (err) {
            http.response(res, 500, false, err);
          } else {
            console.log("File Was Uploaded");
          }
        });

        const name = req.body.techstack_name;
        const img = req.files.techstack_img.name;
        const data = {
          techstack_name: name,
          techstack_img: img,
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
  .route("/techstacks/:id")
  .put(authorization,async (req, res, next) => {
    try {
      const ID = req.params.id;
      const Insert = await controllers.Techstack.GetbyID(ID);

      if(Insert.techstack_img != null && req.body.techstack_name != Insert.techstack_name) {

        fs.rename(__basedir + '/public/photo/techstacks/' + Insert.techstack_name + ',' + Insert.techstack_img , __basedir + '/public/photo/techstacks/' + req.body.techstack_name + ',' + Insert.techstack_img , (err) => {
          if (err) throw err;
          console.log('Rename complete!');
        });

      }
       
      const result = await controllers.Techstack.Update(req.body, ID);
      if (result.affectedRows > 0) {
        http.response(res, 201, true, "Update successful");
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
      const DeleteImgResult = await controllers.services.GetbyID(ID);

      if(DeleteImgResult.techstack_img != null) {
        // Delete Static Image
        const PathToDelete = __basedir + "/public/photo/techstacks/" + DeleteImgResult.techstack_name + ',' + DeleteImgResult.techstack_img;
        fs.unlink(PathToDelete, function (err) {
          if (err) {console.log('Dont Have File in folder')}
        });
      }

      const result = await controllers.Techstack.Delete(ID);
      if (result.affectedRows > 0) {
        http.response(res, 201, true, "Deleted successful");
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
      const result = await controllers.Techstack.GetbyID(ID);
      if (result) {
        http.response(res, 201, true, "Get successful", result);
      } else {
        http.response(res, 204, false, "No Content, no data in entity");
      }
    } catch (e) {
      console.log(e);
      http.response(res, 500, false, "Internal server error");
    }
  });


router
  .route("/teckstacks/image/:id")
  .put(authorization,async (req, res, next) => {
    try {
      const ID = req.params.id;

        const fixResult = await controllers.Techstack.GetbyID(ID);
        const file = req.files.techstack_img;

        if(fixResult.techstack_img === null) {
          // Save Static Image
        sampleFile = file;
        uploadPath = __basedir + "/public/photo/techstack/" + fixResult.techstack_name + ',' + sampleFile.name;

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
          __basedir + "/public/photo/techstacks/" + fixResult.techstack_name + ',' + fixResult.techstack_img;
        fs.unlink(PathToDelete, function (err) {
          if (err) {console.log('Dont Have File in folder')}
        });

        // Save Static Image
        sampleFile = file;
        uploadPath = __basedir + "/public/photo/techstacks/" + fixResult.techstack_name + ',' + sampleFile.name;

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
          techstack_img: file.name,
        };
        const result = await controllers.services.Update(ImgName, ID);
        if (result.affectedRows > 0) {
          http.response(res, 201, true, "Update successful");
        } else {
          http.response(res, 204, false, "No Content, no data in entity");
        }

    } catch (e) {
      console.log(e);
      http.response(res,500,false, "Internal server error")
    }
  })

module.exports = router;
