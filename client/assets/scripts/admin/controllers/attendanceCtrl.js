myApp.controller('attendanceCtrl', ['$scope', '$http', '$location', 'DataService', '$mdToast', '$document', function ($scope, $http, $location, DataService, $mdToast, $document) {
    console.log('on admin attendance controller--attendanceCtrl.js');
    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();

    $scope.user = $scope.dataService.peopleData();

    $scope.students = [];

    if ($scope.dataService.peopleData() === undefined) {
        $scope.dataService.retrieveData().then(function () {
            $scope.user = $scope.dataService.peopleData();
        });
    }

    $scope.getAttendance = function () {
        $http.get('/attendance', {
            params: {
                date: $scope.date,
                who: $scope.dataService.getTeacher()
            }
        }).then(function (response) {

            $scope.students = response.data;

        })
    };
    $scope.putAttendance = function () {
        $http.put('/attendance', $scope.students).then(function (response) {
            $scope.showActionToast();
            $scope.getAttendance();
        })
    };

    $scope.showActionToast = function () {
        var absent = 0;
        var present = 0;

        $scope.students.forEach(function(obj){
            if (obj.attendance_status == 'absent'){
                absent++;
            } else if (obj.attendance_status == 'present'){
                present++;
            }

        });
        //Helps position toast
        var el = angular.element(document.getElementById('attBtn'));

        var toast = $mdToast.simple()
            .content('Absent: ' + absent + '\nPresent: ' + present)
            .action('OK')
            .highlightAction(false)
            .hideDelay(2000)
            .parent(el)
            .position('bottom');

        $mdToast.show(toast).then(function (response) {
            $location.path('/dashboard');
        });
    };


    $scope.getAttendance();

}]);