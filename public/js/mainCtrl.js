angular.module("gearApp").controller("mainCtrl", function($scope, mainServ){

$scope.test="this is the main test";

$scope.postNewItem = function(item){
  item.contact = [currentUser._id];
  mainServ.postNewItem(item)
  .then(function(response){
    $scope.getAllItems();
    var user = currentUser;
    user.listItems = [response._id];
    mainServ.putUser(user)
    .then(function(res){
      //anything else
    })
  })
};

$scope.postNewUser = function(user){
  console.log(user);
  mainServ.postNewUser(user)
  .then(function(response){
    console.log(response);
  })
};

$scope.logout = function(){
  mainServ.logout()
  .then(function(resp){
    
  })
}

});
