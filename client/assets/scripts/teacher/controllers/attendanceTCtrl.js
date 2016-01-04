myApp.controller('attendanceTCtrl', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
    console.log('on teacher attendance controller--attendanceTCtrl.js');


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
        $http.get('/attendance', {params: {date: $scope.date, who: $scope.user}}).then(function(response){

            $scope.students = response.data;

            console.log($scope.students[1]);

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