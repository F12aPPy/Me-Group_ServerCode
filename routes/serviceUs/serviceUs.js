const express = require("express");
const router = express.Router();
// const bcrypt = require('bcrypt');
const http = require("../../config/http");
const controllers = require("../../controllers/index");
const { v4: uuidv4 } = require('uuid')
const fs = require("fs");
const authorization = require('../../middlewares/authorize');

router
  .route("/serviceUs")
  .get(async (req, res, next) => {
    try {
      const result = await controllers.serviceUs.List();
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
        const Creating = await controllers.serviceUs.Insert(req.body);
        if (Creating) {
          http.response(res, 201, true, "Created successful");
        } else {
          http.response(res, 400, false, "Bad request, unable to created data");
        }
      } else {
       // Setting Path and File To Save Image
        const FiletoSave = req.files.serviceUs_img;
        const NameFile = uuidv4() + "-" + req.files.serviceUs_img.name
        const contents = __basedir + "/public/photo/serviceUs/" + NameFile;
        // Save Image
        FiletoSave.mv(contents, async function(err) {
          if(err) {
            http.response(res, 500, false, "Fail to Upload Image");
            return 
          } else {
             // Save Data To Database
             const Data = req.body
             Data.serviceUs_img = NameFile
             const Creating = await controllers.serviceUs.Insert(Data);
             if (Creating) {
               http.response(res, 201, true, "Created successful");
             } else {
               http.response(res, 400, false, "Bad request, unable to created data");
             }
             // end of save Data
          }
        }) // End Save Image
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
      const GetByID = await controllers.serviceUs.GetbyID(ID);

      if(!req.files) {
        const result = await controllers.serviceUs.Update(req.body, ID);
        if( result.affectedRows > 0 ) {
          http.response(res, 201, true, "Update successful");
        } else {
          http.response(res, 204, false, "No Content, no data in entity");
        }
      } else {
        // Delete File
        if(GetByID.serviceUs_img != null && GetByID.serviceUs_img != "") {
          const PathToDelete = __basedir + "/public/photo/serviceUs/" + GetByID.serviceUs_img
          fs.unlink(PathToDelete, (err) => { if(err){ console.log(err) } })
        }
        // Setting Path and File To Save Image
        const FiletoSave = req.files.serviceUs_img;
        const NameFile = uuidv4() + "-" + req.files.serviceUs_img.name
        const contents = __basedir + "/public/photo/serviceUs/" + NameFile;
        // Save Image
        FiletoSave.mv(contents, async function(err) {
          if(err) {
            http.response(res, 500, false, "Fail to Upload Image");
            return 
          } else {
             // Save Data To Database
             const Data = req.body
             Data.serviceUs_img = NameFile
             const result = await controllers.serviceUs.Update(Data, ID);
             if (result.affectedRows > 0) {
              http.response(res, 201, true, "Update successful");
             } else {
              http.response(res, 204, false, "No Content, no data in entity");
            }
             // end of save Data
          }
        }) // End Save Image
      }
    } catch (e) {
      console.log(e);
      http.response(res, 500, false, "Internal server error");
    }
  })
  .delete(authorization,async (req, res, next) => {
    try {
      const ID = req.params.id;
      const GetByID = await controllers.serviceUs.GetbyID(ID);
      // Delete File
      if(GetByID.serviceUs_img != null && GetByID.serviceUs_img != "") {
        const PathToDelete = __basedir + "/public/photo/serviceUs/" + GetByID.serviceUs_img
        fs.unlink(PathToDelete, (err) => { if(err){ console.log(err) } })
      }
      const result = await controllers.serviceUs.Delete(ID);
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
      const result = await controllers.serviceUs.GetbyID(ID);
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
  .route("/serviceUs/image/:id")
  .put(authorization,async (req, res, next) => {
    try {
        const ID = req.params.id;
        const fixResult = await controllers.serviceUs.GetbyID(ID);
        const file = req.files.serviceUs_img;
        const fileName = uuidv4() + file.name;
        if(fixResult.serviceUs_img == null || fixResult.serviceUs_img == "") {
          // Save Static Image
        uploadPath = __basedir + "/public/photo/serviceUs/" + fileName;
        file.mv(uploadPath, function (err) {
          if (err) {
            http.response(res, 500, false, err);
          } else {
            console.log("File Was Uploaded");
          }
        });
        } else {
          // Delete Static Image
          const PathToDelete = __basedir + "/public/photo/serviceUs/" + fixResult.serviceUs_img;
        fs.unlink(PathToDelete, function (err) {
          if (err) {console.log('Dont Have File in folder')}
        });
        // Save Static Image
        uploadPath = __basedir + "/public/photo/serviceUs/" + fileName;
        file.mv(uploadPath, function (err) {
          if (err) {
            http.response(res, 500, false, err);
          } else {
            console.log("File Was Uploaded");
          }
        });
        }
        const Image = {
          serviceUs_img: fileName
        }
        const result = await controllers.serviceUs.Update(Image, ID);
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
