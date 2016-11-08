angular.module("gearApp")
.directive("navDir", function(){
  return {
    templateUrl: "./templates/navDir.html",
    controller: "mainCtrl",
    restirct: "AE"
  }

});
