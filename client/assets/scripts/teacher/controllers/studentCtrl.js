myApp.controller('studentCtrl', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
    console.log('on student controller--studentCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();

    $scope.user = $scope.dataService.peopleData();
    $scope.student = $scope.dataService.getStudent();
    console.log("This is the student that was selected", $scope.student);

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
            console.log($scope.user);
        });
    }
}]);