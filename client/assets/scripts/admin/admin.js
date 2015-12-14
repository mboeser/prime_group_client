//ADMIN APPLICATION
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/dashboard', {
            templateUrl: "/views/routes",
            controller: "dashCtrl"
        })
        .when('/teacher', {
            templateUrl: "/views/routes/",
            controller: "teacherCtrl"
        })
        .when('/attendance', {
            templateUrl: "/views/routes/",
            controller: "attendanceCtrl"
        })
        .when('/absent', {
            templateUrl: "/views/routes/",
            controller: "absentCtrl"
        })
        .when('/prework', {
            templateUrl: "/views/routes/",
            controller: "preworkCtrl"
        })
        .when('/user', {
            templateUrl: "/views/routes/",
            controller: "userCtrl"
        })
        .otherwise('dashboard');
}]);