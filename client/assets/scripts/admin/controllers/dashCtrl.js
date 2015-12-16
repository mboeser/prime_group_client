myApp.controller('dashCtrl', ['$scope', '$http', 'DataService', function($scope, $http, DataService) {

    $scope.dataService = DataService;
    $scope.user = {};

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
          $scope.user = $scope.dataService.peopleData();
        });
    }




    $scope.prework = {};
    $scope.absent = {};

    $scope.getAbsences = function(){
        console.log($scope.absent);
        $http.get('/absent', {params: {date: $scope.absent.date }}).then(function(response){
           console.log(response);
        });
    };

    $scope.getPrework = function(){
        $http.get('/prework', {params: {date: $scope.prework.date}}).then(function(response) {
            console.log(response);
        });
    };


    console.log('on admin dashboard controller--dashCtrl.js')
}]);