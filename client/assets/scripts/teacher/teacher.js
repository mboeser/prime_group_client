//TEACHER APP
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/dashboard', {
            templateUrl: "/views/routes/teacher/teacher-dash.html",
            controller: "dashTCtrl"
        })
        .when('/attendance', {
            templateUrl: "/views/routes/attendance/attendance.html",
            controller: "attendanceTCtrl"
        })
        .when('/class', {
            templateUrl: "/views/routes/teacher/",
            controller: "classCtrl"
        })
        //two views, one controller for students?
        .when('/highschool', {
            templateUrl: "/views/routes/student/student-hs.html",
            controller: "studentCtrl"
        })
        .when('/middleschool', {
            templateUrl: "/views/routes/student/student-ms.html",
            controller: "studentCtrl"
        })

        .otherwise('dashboard');
}]);