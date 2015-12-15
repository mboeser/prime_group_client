//ADMIN APPLICATION
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/dashboard', {
            templateUrl: "/views/routes/admin/admin-dashboard.html", //main dashboard view
            controller: "dashCtrl"
        })
        .when('/teacher', {
            templateUrl: "/views/routes/admin/select-teacher.html", //select teacher view NEEDED
            controller: "teacherCtrl"
        })
        .when('/attendance', {
            templateUrl: "/views/routes/attendance/attendance.html", //take attendance view
            controller: "attendanceCtrl"
        })
        .when('/absent', {
            templateUrl: "/views/routes/admin/absent-report.html", //absent view NEEDED
            controller: "absentCtrl"
        })
        .when('/prework', {
            templateUrl: "/views/routes/admin/prework-report.html", //prework view NEEDED
            controller: "preworkCtrl"
        })
        .when('/user', {
            templateUrl: "/views/routes/admin/admin-users.html", //make /change user permissions view
            controller: "userCtrl"
        })
        .when('/upload', {
<<<<<<< HEAD
            templateUrl: "/views/routes/", //upload view NEEDED
=======
            templateUrl: "/views/routes/admin/upload-csv.html",
>>>>>>> master
            controller: "uploadCtrl"
        })
        .otherwise('dashboard');
}]);