myApp.controller('studentACtrl', ['$scope', '$http', 'DataService', '$mdToast', function ($scope, $http, DataService, $mdToast) {
    console.log('on student controller--studentCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();

    $scope.user = $scope.dataService.peopleData();
    $scope.student = $scope.dataService.getStudent();

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        });
    }


    $scope.dropdown = ['Not Yet Called','Reached','Left Message'];

    $scope.updateNotes = function(col, note){
        $http.put('/updateStudent', {params: {'column': col, 'value': note, 'id': $scope.student.id}}).then(function(){
            $scope.editUserToast();
            $scope.setPrework();
        });
    };

    $scope.updateBus = function(col, note){
        $http.put('/updateBus', {params: {'column': col, 'value': note, 'id': $scope.student.id}}).then(function(){
            $scope.editUserToast();
            $scope.setPrework();
        });
    };

    $scope.updateInfo = function(col, note){
        $http.put('/updateStudentInfo', {params: {'column': col, 'value': note, 'id': $scope.student.id}}).then(function(){
            $scope.editUserToast();
            $scope.setPrework();
        });
    };

    //before switching to the next page, don't forget to update the student factory information?
    $scope.setPrework = function() {
        var date=$scope.student.class_date.slice(0,10);
        $http.get('/prework', {params: {'date': date}}).then(function (response) {
            $scope.dataService.setData(response.data);
        });
    };

    $scope.editUserToast = function () {
        $mdToast.show($mdToast.simple().content('Student Edited!'));
    };

}]);