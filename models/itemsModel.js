const mongoose = require('mongoose');
const reviewModel = require('./reviewModel.js');

var itemsSchema = new mongoose.Schema({
  active: Boolean,
  name: String,
  desc: String,
  cost: String,
  img: [String],
  rented: Boolean,
  returned: Boolean,
  tags:[String],
  contact: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  availability: Boolean,
  review: [{
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    body: String
  }]
});

module.exports = mongoose.model("Items", itemsSchema);
