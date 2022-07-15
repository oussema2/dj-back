const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartySchema = new Schema({
  dj: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  partyType: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  numberOfGuest: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  partyTime: {
    type: String,
    required: true,
  },
  partyLength: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  clientProfile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const Party = mongoose.model("Party", PartySchema);
module.exports = Party;
