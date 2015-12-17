myApp.controller('attendanceCtrl', ['$scope', '$http', '$location','DataService', function ($scope, $http, $location, DataService) {
    console.log('on admin attendance controller--attendanceCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.user = $scope.dataService.peopleData();

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        });
    }


}]);