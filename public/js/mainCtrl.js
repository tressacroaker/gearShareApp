angular.module("gearApp").controller("mainCtrl", function($scope, mainServ, Upload, $timeout, $state) {

        $scope.deleteUserButton = true;
        $scope.deleteItemButton = true;

        $scope.postNewItem = function(item) {
          console.log(item);
          if($scope.currentUser){
              item.contact = $scope.currentUser._id;
          }

          mainServ.postNewItem(item)
          .then(function(response) {
            $scope.getItems();
              $scope.currentUser.items.push(response._id);
              $scope.updateTheUser($scope.currentUser);
              $state.go("items")
          })
        };

        $scope.getItems = function(){
          mainServ.getAllItems()
          .then(function(response){
            $scope.allItems = response;
            console.log($scope.allItems);
          })
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
          })
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
            })
          })
        }

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
          }
        };

        $scope.logout = function() {
            mainServ.logout()
            .then(function(resp) {
            })
        }

        $scope.uploadPic = function(file) {
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {
                    username: $scope.username,
                    file: file
                },
            });
            file.upload.then(function(response) {
                $timeout(function() {
                    file.result = response.data;
                });
            }, function(response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

        };
    });

// this goes back on line 11
            // item.img = document.getElementById('picthing').src;
