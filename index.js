const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

var config = require("./config/config.js");
var itemsCtrl = require('./controllers/itemsCtrl.js');
var userCtrl = require("./controllers/userCtrl.js");

var app = express();

require('./config/passport.js')(passport);

app.use(session(config));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'))

// app.get("/user", userCtrl.getAll);

app.post('/login', passport.authenticate('local-signup'), userCtrl.login);
app.get('/logout', userCtrl.logout);
app.get('/current', userCtrl.getMe);

app.get('/items', itemsCtrl.read);
app.post('/items', itemsCtrl.create);
app.put('/items/:id', itemsCtrl.update);
app.delete('/items/:id', itemsCtrl.destroyer);

mongoose.connect('mongodb://localhost: 27017/gearDB');
mongoose.connection.once('open', function(){
  console.log('connected to mongoDB');
});

app.listen(8000, function(){
  console.log("listening on 8000");
});
