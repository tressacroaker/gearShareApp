var app = angular.module("gearApp", ['ui.router', 'ngFileUpload']);
app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state("login", {
      url: "/",
      templateUrl: "./templates/login.html",
    })
    .state("home", {
      url: "/home",
      templateUrl: './templates/home.html',
    })
    .state("items", {
      url: "/items",
      templateUrl: './templates/items.html',
    })
    .state("postForm", {
      url: "/postForm",
      templateUrl: './templates/postForm.html',
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
