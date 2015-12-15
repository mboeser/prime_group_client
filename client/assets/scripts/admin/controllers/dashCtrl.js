myApp.controller('dashCtrl', ['$scope', '$http', function($scope, $http){

    $scope.prework = {};
    $scope.absent = {};

    $scope.getAbsences = function(){
        console.log($scope.absent);
    };

    $scope.getPrework = function(){
        console.log($scope.prework);
    };


    console.log('on admin dashboard controller--dashCtrl.js')
}]);