myApp.controller('dashCtrl',['$scope', '$http', '$location','DataService', function ($scope, $http, $location, DataService) {

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
        $http.get('/absent', {params: {date: $scope.absent.date }}).then(function(response){
            $scope.dataService.setData(response.data);
            $location.path('#absent');
        });
    };

    $scope.getPrework = function(){
        $http.get('/prework', {params: {date: $scope.prework.date}}).then(function(response) {
            $scope.dataService.setData(response.data);
            $location.path('#prework');
        });
    };


    console.log('on admin dashboard controller--dashCtrl.js');

}]);