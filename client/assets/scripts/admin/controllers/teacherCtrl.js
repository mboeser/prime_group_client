myApp.controller('teacherCtrl', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
    console.log('on admin teacher select controller--teacherCtrl.js');

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


    $scope.teachers = [];

    $scope.getTeachers = function(classdate){
        //Retrieve all teachers for a classdate for selection
        $http.get('/admin/teachers', {params: {date: classdate}}).then(function(response){
            response.push($scope.teachers);
        });
    };

    $scope.selectTeacher = function(teacher, classdate){
      $http.get('/prework', {params:{date: classdate,
                                      who: teacher}}).then(function(response){
          console.log(response);
      })
    };

    $scope.getTeachers();


}]);