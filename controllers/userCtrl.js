const UserModel = require('./../models/userModel.js');

module.exports = {
  getAll: function(req, res){
    UserModel
    .find()
    // req.query isn't necessary
    .exec(function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    });

  },
};



// module.exports {
//   login: function(req, res){
//     res.send();
//   },
//   logout: function(req, res){
//     req.logout();
//     console.log(req + " has been logged out");
//     res.send();
//   },
//   getMe: function(req, res){
//     if(!req.user){
//       return res.send();
//     }
//     UserModel
//     .findById(req.user._id)
//     .exec(function(err, result){
//       if(err){
//         res.send(err);
//       } else {
//         res.send(result);
//       }
//     })
//   }
//
// };
