var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: "/views/routes",
            controller: ""
        })
        .when('/', {
            templateUrl: "/views/routes/",
            controller: ""
        })
        .when('/queue', {
            templateUrl: "/views/routes/",
            controller: ""
        })
        .otherwise('');
}]);