myApp.controller('attendanceTCtrl', ['$scope', '$http', 'DataService', '$mdToast', '$document', function ($scope, $http, DataService, $mdToast, $document) {
    console.log('on teacher attendance controller--attendanceTCtrl.js');


    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();

    $scope.user = $scope.dataService.peopleData();

    $scope.students = [];

    if ($scope.dataService.peopleData() === undefined) {
        $scope.dataService.retrieveData().then(function () {
            $scope.user = $scope.dataService.peopleData();
            console.log($scope.user);
        });
    }

    $scope.getAttendance = function () {
        $http.get('/attendance', {
            params: {
                date: $scope.date,
                who: $scope.user.emails[0].value
            }
        }).then(function (response) {

            $scope.students = response.data;

            console.log($scope.students[1]);
            console.log($scope.user.emails[0]);

            console.log('here ATT response', response.data);
        })
    };
    $scope.putAttendance = function () {
        $http.put('/attendance', $scope.students).then(function (response) {
            console.log(response);
            $scope.showActionToast();
            $scope.getAttendance();
        })
    };


    $scope.showActionToast = function () {
        //console.log($scope.students);

        var absent = 0;
        var present = 0;

        $scope.students.forEach(function(obj){
            if (obj.attendance_status == 'absent'){
                absent++;
            } else if (obj.attendance_status == 'present'){
                present++;
            }

        });

        var el = angular.element(document.getElementById('attBtn'));

        var toast = $mdToast.simple()
            .content('Absent: ' + absent + '\nPresent: ' + present)
            .action('OK')
            .highlightAction(false)
            .hideDelay(false)
            .parent(el)
            .position('bottom');

        $mdToast.show(toast).then(function (response) {
            if (response == 'ok') {
                alert('You clicked \'OK\'.');
            }
        });
    };

    $scope.getAttendance();


}]);