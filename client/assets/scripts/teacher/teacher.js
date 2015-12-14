//TEACHER APP
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/dashboard', {
            templateUrl: "/views/routes",
            controller: "dashCtrl"
        })
        .when('/attendance', {
            templateUrl: "/views/routes/",
            controller: "attendanceCtrl"
        })
        .when('/class', {
            templateUrl: "/views/routes/",
            controller: "classCtrl"
        })
        .when('/student', {
            templateUrl: "/views/routes/",
            controller: "studentCtrl"
        })
        //MAYBE NEED TWO ROUTES FOR STUDENTS?
        .otherwise('dashboard');
}]);