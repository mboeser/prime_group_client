myApp.controller('teacherCtrl', ['$scope', '$http', 'DataService', function($scope, $http, DataService) {
    console.log('on admin teacher select controller--teacherCtrl.js');
    $scope.dataService = DataService;
    $scope.user = {};

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        });
    }
}]);