const djRouter = require("express").Router();
const DjController = require("../Controllers/DjController");
const imageUpload = require("../Multer/fileUpload").uploadFile;
const JWTChecker = require("../Controllers/JWTController");

djRouter
  .route("/register")
  .post(imageUpload.array("pictures", 999999), DjController.register);

djRouter.route("/login/:email/:password").get(DjController.login);

djRouter.route("/getUser").get(JWTChecker.JWTChecker, DjController.getUser);
djRouter.route("/getDjs").get(DjController.getDjs);
djRouter
  .route("/getDjByBussinessName/:businessName")
  .get(DjController.getDjByBussinessName);

djRouter.route("/getLast10DJ").get(DjController.getLast10Dj);
djRouter.route("/getAllDjs").get(DjController.getAllDjs);
module.exports = djRouter;
