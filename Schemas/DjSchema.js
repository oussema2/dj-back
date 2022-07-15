const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const DjSchema = new Schema({
  _id: {
    unique: true,
    trim: true,
    type: String,
    required: true,
  },
  email: {
    unique: true,
    trim: true,
    type: String,
    required: true,
  },
  firstName: {
    trim: true,
    type: String,
    required: true,
  },
  lastName: {
    trim: true,
    type: String,
    required: true,
  },
  phoneNumber: {
    trim: true,
    type: String,
    required: true,
  },
  password: {
    trim: true,
    type: String,
    required: true,
  },
  state: {
    trim: true,
    type: String,
    required: true,
  },
  businessName: {
    trim: true,
    type: String,
    required: true,
    unique: true,
  },
  djType: {
    trim: true,
    type: String,
    required: true,
  },
  otherTypes: {
    type: Array,
    default: [],
  },
  profilePicture: {
    trim: true,
    type: String,
    required: true,
  },
  pictures: {
    type: Array,
    default: [],
  },
  upcomingPartys: {
    type: Array,
    default: [],
  },
  previousPartys: {
    type: Array,
    default: [],
  },
  pendingPartys: {
    type: Array,
    default: [],
  },
  tarif: {
    trim: true,
    type: String,
    required: true,
  },
  bio: {
    trim: true,
    type: String,
    required: true,
  },
});

DjSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Dj = mongoose.model("Dj", DjSchema);
module.exports = Dj;
