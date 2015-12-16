myApp.controller('absentCtrl', ['$scope', '$http', 'DataService', function($scope, $http, DataService){
    console.log('on admin absent controller--absentCtrl.js')

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.user = $scope.dataService.peopleData();

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        });
    }
}]);