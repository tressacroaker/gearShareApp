app.service("mainServ",function($http){

  this.postNewUser = function(user){
    console.log(user);
    return $http({
      method: "POST",
      url: "/login",
      data:user
    }).then(function(response){
      console.log()
        return response;
    })
  };

  this.logout = function(){
    return $http({
      method: "GET",
      url: "/logout"
    }).then(function(resp){
      return resp;
    })
  };



});
