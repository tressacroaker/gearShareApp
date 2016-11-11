angular.module("gearApp")
.controller("mainCtrl", function($scope, $state, mainServ, $timeout) {

        $scope.deleteUserButton = true;
        $scope.deleteItemButton = true;

        $scope.postNewItem = function(item) {
          console.log(item);
          if($scope.currentUser){
              item.contact = $scope.currentUser._id;
          };

          mainServ.postNewItem(item)
          .then(function(response) {
            $scope.getItems();
              $scope.currentUser.items.push(response._id);
              $scope.updateTheUser($scope.currentUser);
              $state.go("items")
          });
        };

        $scope.getItems = function(){
          mainServ.getAllItems()
          .then(function(response){
            $scope.allItems = response;
            console.log($scope.allItems);
          });
        };
        $scope.getItems();

        $scope.deleteTheItem = function(itemToDelete){
          $scope.deleteItemButton = false;
          mainServ.deleteTheItem(itemToDelete)
          .then(function(response){
            $scope.getItems();
            // location.reload();
            // $state.go("home");
          })
        };

        $scope.getCurrentItem = function() {
          mainServ.getCurrentItem()
          .then(function(response){
            $scope.currentItem = response;
            console.log($scope.currentItem)
          });
        };

        $scope.updateTheItem = function(currentItem){
            $scope.editItemButton = false;
            mainServ.updateTheItem(currentItem)
            .then(function(response){
              console.log(response);
              $scope.getCurrentItem();
            });
        };

        $scope.postNewUser = function(user) {
            mainServ.postNewUser(user)
                .then(function(response) {
                    $scope.getCurrentUser();
                    $state.go("home");
                });
        };
        $scope.getCurrentUser = function(){
          mainServ.getCurrentUser()
          .then(function(response){
            $scope.currentUser = response;
            console.log($scope.currentUser)
          });
        };

        $scope.updateRentals = function(item){
          item.rented = true;
          mainServ.updateTheItem(item)
          .then(function(response){
            $scope.getAllItems();
            $scope.currentUser.rentedItems.push(item._id);
            mainServ.updateTheUser($scope.currentUser).then(function(resp){
              $scope.getCurrentUser();
            })
          })
        }

        $scope.deleteUser = function(currentUser) {
          mainServ.deleteUser(currentUser)
          .then(function(response){
            $state.go("home");
          });
        };
        $scope.changePassword = function(currentUser){
          mainServ.deleteUser(currentUser)
          .then(function(response){
            currentUser.password = currentUser.newPassword
            mainServ.postNewUser(currentUser)
            .then(function(response){
              $scope.getCurrentUser();
            });
          });
        };

        $scope.updateTheUser = function(currentUser){
          if(currentUser.newPassword){
            $scope.changePassword(currentUser);
          } else {
            $scope.editUserButton = false;
            mainServ.updateTheUser(currentUser)
            .then(function(response){
              console.log(response);
              $scope.getCurrentUser();
            });
          };
        };

        $scope.logout = function() {
            mainServ.logout()
            .then(function(resp) {
            });
        };

});
