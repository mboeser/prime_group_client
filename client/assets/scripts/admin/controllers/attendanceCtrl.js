myApp.controller('attendanceCtrl', ['$scope', '$http', function($scope, $http){
    console.log('on admin attendance controller--attendanceCtrl.js');

    $scope.teachers = [];

    $scope.getTeachers = function(classdate){
        $http.get('/admin/teachers', {params: {date: classdate}}).then(function(response){
           console.log(response);
        });
    }

}]);