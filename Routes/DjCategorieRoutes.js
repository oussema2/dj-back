const djCategorieRouter = require("express").Router();
const DjCategorieController = require("../Controllers/DjCategorieController");

djCategorieRouter
  .route("/addCategorie")
  .post(DjCategorieController.addCategorie);
djCategorieRouter
  .route("/getAllDjCategories")
  .get(DjCategorieController.getAllDjCategories);
module.exports = djCategorieRouter;
