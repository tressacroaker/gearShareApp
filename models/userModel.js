var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var itemsModel = require('./../models/itemsModel.js');

var userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  picture: String,
  about: String,
  payment: {
    nameOnCard: String,
    cardNumber: Number,
    securityCode: Number,
    expirationDate: Number,
    zipCode: Number
  },
  items: [{type: mongoose.Schema.Types.ObjectId, ref: "Items"}],
  itemsRented: [{type: mongoose.Schema.Types.ObjectId, ref: "Items"}]
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
