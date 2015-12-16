myApp.controller('attendanceTCtrl', ['$scope', '$http', function($scope, $http){
    console.log('on teacher attendance controller--attendanceTCtrl.js');


    $scope.dataService = DataService;
    $scope.user = {};
    $scope.user = $scope.dataService.peopleData();

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        });
    }



}]);