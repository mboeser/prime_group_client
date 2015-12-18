myApp.controller('classCtrl', ['$scope', '$http', 'DataService', '$location', function ($scope, $http, DataService, $location) {
    console.log('on teacher class controller--classCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();
    $scope.students = $scope.dataService.getData();
    $scope.classdate = ($scope.students[0].class_date).slice(0, 10);
    $scope.student;
    console.log("This is your student data", $scope.students);

    $scope.user = $scope.dataService.peopleData();

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
            console.log($scope.user);
        });
    }

    //This will retrieve the student information of the student the user clicked on.
    $scope.selectStudent = function(studentID){
        $http.get('/student', {params: {'student': studentID}}).then(function(response){
            $scope.dataService.setStudent(response.data[0]);
            $scope.dataService.getStudent();
            console.log("This is response.data", response.data[0]);
            console.log("This is the student in the factory", $scope.dataService.getStudent());
            $scope.student=$scope.dataService.getStudent();
            if($scope.student.grade < 9){
                $location.path('/middleschool');
            }else {
                $location.path('/highschool');
            }
        });
    };

    //$scope.selectStudent('bgates');//hard coded for now

}]);