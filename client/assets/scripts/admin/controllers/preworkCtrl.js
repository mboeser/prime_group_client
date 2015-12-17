myApp.controller('preworkCtrl', ['$scope', '$http', '$location','DataService', function ($scope, $http, $location, DataService) {
    console.log('on admin prework controller--preworkCtrl.js');

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

    $scope.studentList = $scope.dataService.getData();
    console.log($scope.studentList);

    $scope.openStudent = function(student){
        $http.get('/student', {params: {who: student}}).then(function(response){
            console.log(response.data);
            $scope.dataService.setData(response.data);

        });
    }

}]);