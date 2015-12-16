myApp.controller('userCtrl', ['$scope', '$http', 'DataService', function($scope, $http, DataService) {
    console.log('on admin user controller--userCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.user = $scope.dataService.peopleData();

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        });
    }

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