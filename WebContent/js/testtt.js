var app = angular.module("demoapp", []);
app.controller('myCtrl1',function($scope){
   
    	$scope.headquarter= {
            lat: 10.6762294,
            lng: 122.3866134,
            focus: true,
            zoom: 16 }
        $scope.markers= {}

    
});