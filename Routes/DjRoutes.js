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
djRouter.route("/getUserNormal/:id").get(DjController.getUserNormal);

djRouter.route("/acceptParty/:dj/:partyId").get(DjController.acceptParty);
djRouter
  .route("/declineParty/:partyId")
  .get(JWTChecker.JWTChecker, DjController.declineParty);

djRouter.route("/search/:dj/:state").get(DjController.searchDj);
module.exports = djRouter;
