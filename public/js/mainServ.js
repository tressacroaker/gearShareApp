app.service("mainServ",function($http){

  this.postNewUser = function(user){
    return $http({
      method: "POST",
      url: "/login",
      data: user
    }).then(function(response){
      return $http({
        method: "GET",
        url: "/current"
      }).then(function(response){
        return response.data;
      })
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

this.updateTheUser = function(currentUser){
    return $http({
      method: "PUT",
      url: "/current/" + currentUser._id,
      data: currentUser
    }).then(function(response){
      console.log(response);
      return response.data;
    });
  };


  this.deleteUser = function(currentUser){
    return $http({
      method: "DELETE",
      url: '/current/' + currentUser._id,
    }).then (function(response){
      return response.data;
    });
  };

this.postNewItem = function(item){
  return $http({
    method: "POST",
    url: "/items",
    data: item
  }).then(function(response){
      return response.data;
  })
};

  this.getAllItems = function(){
    return $http({
      method: "GET",
      url: "/profile",
    }).then(function(response){
      return response.data;
    })
  };

  this.deleteItem = function(itemToDelete){
    return $http({
      method: "DELETE",
      url: "/items" + itemToDelete._id,
    }).then(function(response){
      return response;
    })
  };

});
