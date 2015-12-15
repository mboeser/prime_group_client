//ADMIN APPLICATION
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/dashboard', {
            templateUrl: "/views/routes/admin/admin-dashboard.html",
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
            templateUrl: "/views/routes/admin-users.html",
            controller: "userCtrl"
        })
        .otherwise('dashboard');
}]);