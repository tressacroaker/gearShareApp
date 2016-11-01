angular.module("gearApp")
.service("mainServ",function($http){
  this.postNewUser(user){
    console.log(user);
    return $http({
      method: "POST",
      url: "/login",
      data:{
        new User: user
      }
    })
  };



});
