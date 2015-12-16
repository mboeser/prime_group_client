myApp.controller('userCtrl', ['$scope', '$http', 'DataService', function($scope, $http, DataService) {
    console.log('on admin user controller--userCtrl.js');

    $scope.userList = [];
    $scope.newUser = {};

    $scope.submitForm = function() {
        $http.post('/roles', $scope.userList).then(function(response){
            console.log(response);
        });
        console.log($scope.newUser);
    };

    $scope.getUserList = function(){
        $http.get('/roles').then(function(response){
            console.log(response);
        })
    }



}]);