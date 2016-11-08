angular.module("gearApp").controller("mainCtrl", function($scope, mainServ, Upload, $timeout, $state) {

        $scope.users = [];
        $scope.currentUser = "";
        $scope.currentUser = {};
        $scope.deleteUserButton = true;
        $scope.editUserButton = true;
        $scope.items = [];
        $scope.item = {};

        $scope.postNewItem = function(item) {
          console.log(item);
          if($scope.currentUser){
              item.contact = [$scope.currentUser._id];
          }

          mainServ.postNewItem(item)
          .then(function(response) {
              $scope.getItems();
              $scope.currentUser.items.push(response._id);
              mainServ.updateTheUser($scope.currentUser)
              .then(function(response) {
              $state.go("profile");

              })
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

        $scope.deleteItem = function(itemToRemove){
          mainServ.deleteTheItem(itemToRemove)
          .then(function(response){
            $scope.getItems();
            location.reload();
          })
        };

        $scope.postNewUser = function(user) {
            mainServ.postNewUser(user)
                .then(function(response) {
                    $scope.currentUser = response;
                    $state.go("home");
                });
        };

        $scope.deleteUser = function(currentUser) {
          mainServ.deleteUser(currentUser)
          .then(function(response){
            console.log($scope.currentUser);
          });
        };

        $scope.updateTheUser = function(currentUser){
          mainServ.updateTheUser(currentUser)
          .then(function(response){
            console.log(response);
            $scope.currentUser = response;
          });
        };

        // $scope.updateUser = function(currentUser){
        //   mainServ.updateUser(currentUser)
        //   .then(function(response){
        //     $scope.currentUser = response;
        //     $scope.currentUser();
        //   })
        // }

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
