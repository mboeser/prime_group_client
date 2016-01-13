myApp.controller('teacherCtrl', ['$scope', '$http', '$location','DataService', function ($scope, $http, $location, DataService) {
    console.log('on admin teacher select controller--teacherCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();

    $scope.user = $scope.dataService.peopleData();

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        });
    }


    $scope.teachers = [];

    $scope.getTeachers = function(){
        //Retrieve all teachers for a classdate for selection
        $http.get('/admin_attendance', {params: {date: $scope.date}}).then(function(response){
            $scope.teachers = response.data;
        });
    };

    $scope.selectTeacher = function(teacher){
      $scope.dataService.setTeacher(teacher.teacher_email);
    };

    $scope.getTeachers();
}]);