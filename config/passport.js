const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./../models/userModel.js');

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    console.log("USER", user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    console.log("ID", id);
    UserModel.findById(id, function(err, user){
      done(err, user);
    })
  }); 

  passport.use('local-signup',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done){
    process.nextTick(function(){
      UserModel.findOne({'email': email}, function(err, user){
        if (err) return done(err);
        if (user){
          if(user.validPassword(password)){
            console.log("Password correct. Log 'em in.");
            return done(null, user);
          } else {
            console.log("Password incorrect. Go fly a kite.");
            return done(null, false);
          }
        } else {
          var newUser = new UserModel(req.body);
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.save(function(err){
            if(err)throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
