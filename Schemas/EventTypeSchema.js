const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventTypeSchema = new Schema({
  label: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
});

const EventType = mongoose.model("EventType", EventTypeSchema);
module.exports = EventType;
