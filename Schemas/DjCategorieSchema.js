const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DjCategorieSchema = new Schema({
  label: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
});
const DjCategorie = mongoose.model("DjCategorie", DjCategorieSchema);
module.exports = DjCategorie;
