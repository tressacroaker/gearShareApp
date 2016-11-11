var mongoose = require('mongoose');
var reviewModel = require('./../models/reviewModel.js');

var itemsSchema = new mongoose.Schema({
  active: Boolean,
  name: String,
  desc: String,
  cost: Number,
  img: String,
  rented: Boolean,
  returned: Boolean,
  tags:String,
  location: String,
  contact: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  availability: Boolean,
  review: [{
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    body: String
  }]
});

module.exports = mongoose.model("Items", itemsSchema);
