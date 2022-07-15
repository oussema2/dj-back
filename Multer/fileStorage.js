const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

exports.fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const id = uuid.v4();
    let folderName;
    if (!req.body.id) {
      folderName = `/${id}`;
      req.body.id = id;
      try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync("profileImages" + folderName);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      folderName = `/${req.body.id}`;
    }

    //console.log(file.originalname);
    cb(null, "profileImages" + folderName + "/");
  },
  filename: (req, file, cb) => {
    console.log(Date.now());
    const imageName =
      file.originalname + "-" + Date.now() + path.extname(file.originalname);
    req.body.images = !req.body.images ? [] : req.body.images;
    req.body.images.push(imageName);
    cb(null, imageName);
  },
});
