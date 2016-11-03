var userModel = require('./../models/userModel.js');

  module.exports = {
    login: function(req, res, next){
        res.send();
    },
    getMe: function(req,res) {
      if(!req.user){
        return res.send();
      }
      userModel
      .findById(req.user._id)
      .exec(function (err, result) {
        if (err) {
          return res.send(err);
        }
        res.send(result);
      });
    },
    logout: function(req,res) {
      console.log(req);
      req.logout();
      console.log(req + " has been logged out");
      res.send();
    }
  };






// module.exports = {
//   getAll: function(req, res){
//     UserModel
//     .find()
//     // req.query isn't necessary
//     .exec(function(err, result){
//       if(err){
//         res.send(err);
//       } else {
//         res.send(result);
//       }
//     });
//
//   },
// };
