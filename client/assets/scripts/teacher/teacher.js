var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: "/views/routes", //NEED HTML
            controller: "" //NEED CONTROLLER
        })
        .when('/', {
            templateUrl: "/views/routes/", //NEED HTML
            controller: "" //NEED CONTROLLER
        })
        .when('/queue', {
            templateUrl: "/views/routes/", //NEED HTML
            controller: "" //NEED CONTROLLER
        })
        .otherwise('');
}]);