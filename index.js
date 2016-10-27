const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

var config = require("./config/config.js");
var app = express();
var userCtrl = require("./controllers/userCtrl.js");
require('./config/passport.js')(passport);

app.use(session(config));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'))

app.get("/user", userCtrl.getAll);

mongoose.connect('mongodb://localhost: 27017/gearDB');
mongoose.connection.once('open', function(){
  console.log('connected to mongoDB');
});

app.listen(8000, function(){
  console.log("listening on 8000");
});
