var itemsModel = require('./../models/itemsModel.js');

module.exports = {
  read: function(req, res){
    itemsModel
    .find(req.query)
    .populate('contact')
    .exec(function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  create: function(req, res){
    var item = new itemsModel(req.body);
    item.save(function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  update: function(req, res){
    itemsModel
    .findByIdAndUpdate(req.params.id, req.body, function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    })
  },
  delete: function(req, res){
    itemsModel
    .findByIdAndRemove(req.params.id, req.body, function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  getAllItems: function(req, res) {
    itemsModel
    .findById(req.params.id)
    .exec(function (err, result){
      if (err) {
        return res.send(err);
      }
      res.send(result);
    });
  }
};
