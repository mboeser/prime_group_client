myApp.controller('attendanceCtrl', ['$scope', '$http', '$location','DataService', function ($scope, $http, $location, DataService) {
    console.log('on admin attendance controller--attendanceCtrl.js');
    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();

    $scope.user = $scope.dataService.peopleData();

    $scope.students = [];

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
            console.log($scope.user);
        });
    }

    $scope.getAttendance = function(){
        $http.get('/attendance', {params: {date: $scope.date, who: $scope.user.emails[0].value}}).then(function(response){

            $scope.students = response.data;

            console.log($scope.students[1]);
            console.log($scope.user.emails[0]);

            console.log('here ATT response', response.data);
        })
    };
    $scope.putAttendance = function(){
        $http.put('/attendance', $scope.students).then(function(response){
            console.log(response);
            //$scope.getAttendance()
        })
    };


    $scope.getAttendance();

}]);