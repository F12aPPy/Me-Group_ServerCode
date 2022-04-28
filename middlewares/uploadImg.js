const multer = require('multer');

const imageFilter = (req, file, cb) => {
 if (file.mimetype.startsWith("image")) {
     cb(null, true);
 } else {
     cb("Please upload only Image", false);
 }
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../public/photo/services/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-image-${file.originalname}`);
    }
})

let uploadFile = multer({ storage: storage, fileFilter: imageFilter});

module.exports = uploadFile;