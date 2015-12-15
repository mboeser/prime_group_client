//ADMIN APPLICATION
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/dashboard', {
            templateUrl: "/views/routes/admin/admin-dashboard.html", //main dashboard view
            controller: "dashCtrl"
        })
        .when('/teacher', {
            templateUrl: "/views/routes/", //select teacher view NEEDED
            controller: "teacherCtrl"
        })
        .when('/attendance', {
            templateUrl: "/views/routes/attendance/attendance.html", //take attendance view
            controller: "attendanceCtrl"
        })
        .when('/absent', {
            templateUrl: "/views/routes/", //absent view NEEDED
            controller: "absentCtrl"
        })
        .when('/prework', {
            templateUrl: "/views/routes/", //prework view NEEDED
            controller: "preworkCtrl"
        })
        .when('/user', {
            templateUrl: "/views/routes/admin/admin-users.html", //make /change user permissions view
            controller: "userCtrl"
        })
        .when('/upload', {
            templateUrl: "/views/routes/",
            controller: "uploadCtrl"
        })
        .otherwise('dashboard');
}]);