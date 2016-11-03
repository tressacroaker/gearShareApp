angular.module("gearApp")
    .controller("mainCtrl", function($scope, mainServ, Upload, $timeout) {
        $scope.currentUser = "";

        $scope.postNewItem = function(item) {
          if($scope.currentUser){
              item.contact = [currentUser._id];
          }
            mainServ.postNewItem(item)
                .then(function(response) {
                    $scope.getItems();
                    var user = $scope.currentUser;
                    user.listItems = [response._id];
                    mainServ.putUser(user)
                        .then(function(res) {
                            //anything else
                        })
                })
        };

        $scope.getItems = function(){
          mainServ.getAllItems()
          .then(function(response){
            console.log(response)
            $scope.allItems = response;
          })
        };

        // $scope.deleteItem = function(itemToRemove){
        //   mainServ.deleteTheItem(itemToRemove)
        //   .then(function(response){
        //     $scope.getItems();
        //   })
        // };

        $scope.postNewUser = function(user) {
            console.log(user);
            mainServ.postNewUser(user)
                .then(function(response) {
                    $scope.currentUser = response;
                })
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
