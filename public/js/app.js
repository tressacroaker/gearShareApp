angular.module("gearApp", ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state("login", {
      url: "/",
      templateUrl: "./templates/login.html",
    })
    .state("home", {
      url: "/home",
      templateUrl: './templates/home.html',
    })
    .state("rentals", {
      url: "/rentals",
      templateUrl: './templates/rentals.html',
    })
    .state("messages", {
      url: "/messages",
      templateUrl: './templates/messages.html',
    })
    .state("profile", {
      url: "/profile",
      templateUrl: './templates/profile.html',
    });

$urlRouterProvider.otherwise('/');


});
