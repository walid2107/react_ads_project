const mongoose = require("mongoose");
const schema = mongoose.Schema;

// create schema
const AdSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
  },
  owner: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 1055,
  },
  city: {
    type: String,
    required: true,
  },
  img: {
    type: Array,
    required: true,
  },
});

module.exports = Ad = mongoose.model("ads", AdSchema);
