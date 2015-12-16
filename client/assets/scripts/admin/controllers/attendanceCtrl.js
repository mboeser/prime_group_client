myApp.controller('attendanceCtrl', ['$scope', '$http', 'DataService', function($scope, $http, DataService) {
    console.log('on admin attendance controller--attendanceCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.user = $scope.dataService.peopleData();

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        });
    }

    $scope.teachers = [];

    $scope.getTeachers = function(classdate){
        $http.get('/admin/teachers', {params: {date: classdate}}).then(function(response){
           response.push($scope.teachers);
        });
    };

    $scope.getTeachers();
}]);