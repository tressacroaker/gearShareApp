const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'))


mongoose.connect('mongodb://localhost: 27017/gearDB');
mongoose.connection.once('open', function(){
  console.log('connected to mongoDB');
});

app.listen(8000, function(){
  console.log("listening on 8000");
});
