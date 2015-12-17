myApp.controller('dashCtrl',['$scope', '$http', 'DataService', function ($scope, $http, DataService) {

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();

    $scope.user = $scope.dataService.peopleData();

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
            console.log($scope.user);
        });
    }






    $scope.prework = {};
    $scope.absent = {};

    $scope.getAbsences = function(){
        console.log($scope.absent);
        $http.get('/absent', {params: {date: $scope.absent.date }}).then(function(response){
           console.log(response.data);
        });
    };

    $scope.getPrework = function(){
        $http.get('/prework', {params: {date: $scope.prework.date}}).then(function(response) {

            console.log('Here is the prework for date:', $scope.prework.date, response.data);
        });
    };


    console.log('on admin dashboard controller--dashCtrl.js');

}]);