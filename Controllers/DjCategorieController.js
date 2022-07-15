const DjCategorie = require("../Schemas/DjCategorieSchema");

exports.addCategorie = (req, res) => {
  const djCategorie = new DjCategorie(req.body);
  djCategorie.save((err, djCat) => {
    if (err) {
      res.send({
        status: 401,
        message: err,
      });
    }
    if (djCat) {
      res.send({
        status: 200,
        djCat: djCat,
      });
    }
  });
};

exports.getAllDjCategories = (req, res) => {
  DjCategorie.find((err, categories) => {
    if (err) {
      res.send({
        message: err,
        status: 401,
      });
    }
    if (categories) {
      res.send({
        categories: categories,
        status: 200,
      });
    }
  });
};
