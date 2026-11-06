var app = angular.module("firstAPP");

app.controller("LoginController", function(SharedService) {

   SharedService.getMessage();
});