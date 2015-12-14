//TEACHER APP
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/dashboard', {
            templateUrl: "/views/routes/teacher/teacher-dash.html",
            controller: "dashTCtrl"
        })
        .when('/attendance', {
            templateUrl: "/views/routes/",
            controller: "attendanceTCtrl"
        })
        .when('/class', {
            templateUrl: "/views/routes/",
            controller: "classCtrl"
        })
        //two views, one controller for students?
        .when('/student', {
            templateUrl: "/views/routes/",
            controller: "studentCtrl"
        })
        .when('/student', {
            templateUrl: "/views/routes/",
            controller: "studentCtrl"
        })

        .otherwise('dashboard');
}]);