const express = require("express");
const router = express.Router();
const http = require("../../config/http");
const controllers = require("../../controllers/index");
const fs = require('fs');
const authorization = require('../../middlewares/authorize')

router
  .route("/aboutUs/image")
  .get(async (req, res, next) => {
    try {
      const result = await controllers.enterprise_img.List();
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
  .post(authorization, async (req, res, next) => {
    try {

        if(!(req.files)){
            return http.response(res, 404, "Please Upload Image")
        } else if ((req.files.image_name).length > 1) {
          const multiFiles = req.files.image_name;
          let promises = [];
          let allImgName = [];

          //save Image
          multiFiles.forEach((file) => {
            const savePath = __basedir + "/public/photo/aboutUs/" + file.name;
            promises.push(file.mv(savePath));
            allImgName.push(file.name);
            // controllers.enterprise_img.Insert(file.name);
          })
          await Promise.all(promises);

          //save data to database
          for (let i = 0; i < allImgName.length; i++) {
            const data = {
              image_name: allImgName[i],
              aboutUs_id: 1,
            }
            await controllers.enterprise_img.Insert(data);
          }
          http.response(res, 201, true, "Created successful");
        } else {

           // Save Image
         sampleFile = req.files.aboutUs_img;
         uploadPath = __basedir + "/public/photo/aboutUs/" + sampleFile.name;
 
         sampleFile.mv(uploadPath, function (err) {
            if (err) {
              http.response(res, 500, false, err);
            } else {
              console.log("File Was Uploaded");
            }
          });

          const data = {
              image_name: sampleFile.name,
              aboutUs_id: req.body.aboutUs_id,
          }

          const Creating = await controllers.enterprise_img.Insert(data);
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

router.route("/aboutUs/image/:id")
    .delete(authorization,async (req, res, next) => {
            try {
                const ID = req.params.id
                const DeleteImgResult = await controllers.enterprise_img.GetByID()

                if(DeleteImgResult.image_name != null) {
                    // Delete Static Image
                    const PathToDelete = __basedir + "/public/photo/employees/" + DeleteImgResult.image_name;
                    fs.unlink(PathToDelete, function (err) {
                      if (err) {console.log('Dont Have File in folder')}
                    });
                  }

                const result = await controllers.enterprise_img.Delete(ID);
                if (result.affectedRows > 0) {
                    http.response(res, 201, true, 'Deleted successful')
                } else {
                    http.response(res, 400, false, 'Bad request, unable to query deleted')
                }
            } catch (e) {
                console.log(e);
                http.response(res, 500, false, 'Internal server error')
            }
        });

module.exports = router;